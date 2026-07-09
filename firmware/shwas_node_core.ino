/**
 * Project Shwas (श्वॉस) — Upgraded Production Edge Firmware Core
 * License: GPL-3.0-only | Target: ESP32-WROOM-32E + RFM95W + NEO-6M
 */

#include <HardwareSerial.h>
#include <SPI.h>
#include <LoRa.h>
#include <Preferences.h>
#include <TinyGPS++.h>

#define TAMPER_PIN         13
#define SENSOR_POWER_PIN   25
#define SIREN_PIN          12
#define BATTERY_ADC_PIN    34
#define GPS_RX_PIN         9
#define GPS_TX_PIN         10
#define LORA_SS            5
#define LORA_RST           14
#define LORA_DIO0          4

#define PM10_DANGER_CEILING 10000 // 10 mg/m3 occupational ceiling limit

Preferences flashMemory;
HardwareSerial DustSerial(2);
HardwareSerial GPSSerial(1);
TinyGPSPlus gpsModule;

volatile bool caseTamperedAlert = false;
float activeSlopeCorrection = 1.24; // Lab-calibrated sandstone multiplier
bool isTerminalUnlocked = false;

struct __attribute__((__packed__)) HighDensityGPSPayload {
    uint8_t  nodeId;       
    uint16_t pm25Packed;   
    uint16_t pm10Packed;   
    uint8_t  scaledBattery;
    uint8_t  securityFlags;
    float    latitudeVector;  
    float    longitudeVector; 
};

void IRAM_ATTR tamperISR() {
  caseTamperedAlert = true;
}

void setup() {
  Serial.begin(115200);
  GPSSerial.begin(9600, SERIAL_8N1, GPS_RX_PIN, GPS_TX_PIN);
  DustSerial.begin(9600, SERIAL_8N1, 16, 17);
  
  flashMemory.begin("shwas_env", false);
  activeSlopeCorrection = flashMemory.getFloat("slope_mod", 1.24);
  
  pinMode(TAMPER_PIN, INPUT_PULLUP);
  pinMode(SENSOR_POWER_PIN, OUTPUT);
  pinMode(SIREN_PIN, OUTPUT);
  
  digitalWrite(SENSOR_POWER_PIN, HIGH); 
  digitalWrite(SIREN_PIN, LOW);
  
  attachInterrupt(digitalPinToInterrupt(TAMPER_PIN), tamperISR, RISING);

  LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO0);
  if (!LoRa.begin(868E6)) { while (1); } // Halt execution if radio loop fails
}

void loop() {
  while (GPSSerial.available() > 0) { gpsModule.encode(GPSSerial.read()); }
  if (Serial.available() > 0) { handleLocalTerminal(); }

  if (DustSerial.available() >= 32) {
    if (DustSerial.read() == 0x42 && DustSerial.read() == 0x4D) {
      uint8_t frame;
      DustSerial.readBytes(frame, 30);
      
      uint16_t pm25Raw = (frame << 8) | frame;
      uint16_t pm10Raw = (frame << 8) | frame;
      uint16_t pm10Corrected = (uint16_t)((pm10Raw * activeSlopeCorrection) + 14.5);

      // Local Warning Alarms Activation
      if (pm10Corrected >= PM10_DANGER_CEILING) {
        digitalWrite(SIREN_PIN, HIGH);
      } else {
        digitalWrite(SIREN_PIN, LOW);
      }

      int rawAdc = analogRead(BATTERY_ADC_PIN);
      float vBat = (rawAdc / 4095.0) * 3.3 * 2.0;

      HighDensityGPSPayload packet;
      packet.nodeId = 1; 
      packet.pm25Packed = htons(pm25Raw);
      packet.pm10Packed = htons(pm10Corrected);
      packet.scaledBattery = (uint8_t)(vBat * 50.0);
      
      uint8_t flags = 0x00;
      if (caseTamperedAlert) flags |= 0x80;
      
      if (gpsModule.location.isValid() && gpsModule.location.age() < 20000) {
        packet.latitudeVector = (float)gpsModule.location.lat();
        packet.longitudeVector = (float)gpsModule.location.lng();
      } else {
        packet.latitudeVector = 26.23820; 
        packet.longitudeVector = 73.02430;
        flags |= 0x20; // Set GPS signal error flag bit
      }
      packet.securityFlags = flags;

      uint8_t* byteStream = (uint8_t*)&packet;
      LoRa.beginPacket();
      LoRa.write(byteStream, sizeof(packet));
      LoRa.endPacket();

      if (caseTamperedAlert) caseTamperedAlert = false; 
    }
  }
  delay(1000);
}

void handleLocalTerminal() {
  String input = Serial.readStringUntil('\n');
  input.trim();
  if (!isLocalConsoleUnlocked) {
    if (input == "AUTH:SecureMinesAdmin2026") {
      isLocalConsoleUnlocked = true;
      Serial.println("ACCESS_GRANTED");
    } else {
      Serial.println("LOCKED_ERROR");
    }
  } else {
    if (input.startsWith("SET_CAL:")) {
      float targetSlope = input.substring(8).toFloat();
      float oldSlope = flashMemory.getFloat("slope_mod", 1.24);
      if (abs(oldSlope - targetSlope) > 0.01) {
          flashMemory.putFloat("slope_mod", targetSlope);
          activeSlopeCorrection = targetSlope;
          Serial.println("CHANGES_SAVED_PERMANENTLY");
      }
    } else if (input == "LOGOUT") {
      isLocalConsoleUnlocked = false;
      Serial.println("CONSOLE_SECURED");
    }
  }
}
