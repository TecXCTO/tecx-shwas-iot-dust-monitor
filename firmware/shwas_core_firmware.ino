/**
 * Project Shwas — Embedded Node Telemetry & Security Engine Core
 */
#include <HardwareSerial.h>
#include <SPI.h>
#include <LoRa.h>
#include <Preferences.h>
#define TAMPER_PIN         13
#define SENSOR_POWER_PIN   25
#define SIREN_PIN          12
#define BATTERY_ADC_PIN    34
#define LORA_SS            5
#define LORA_RST           14
#define LORA_DIO0          4
#define PM10_DANGER_LEVEL  10000
Preferences flashMemory;
HardwareSerial DustSerial(2);
volatile bool hardwareTamperFlag = false;
float activeSlopeCorrection = 1.0;
bool isTerminalUnlocked = false;
struct __attribute__((__packed__)) HighDensityPayload {
    uint8_t  nodeId;       
    uint16_t pm25Packed;   
    uint16_t pm10Packed;   
    uint8_t  scaledBattery;
    uint8_t  securityFlags;
};
void IRAM_ATTR tamperInterruptHandler() {
  hardwareTamperFlag = true;
}
void setup() {
  Serial.begin(115200);
  
  flashMemory.begin("shwas_env", false);
  activeSlopeCorrection = flashMemory.getFloat("slope_mod", 1.0);
  
  pinMode(TAMPER_PIN, INPUT_PULLUP);
  pinMode(SENSOR_POWER_PIN, OUTPUT);
  pinMode(SIREN_PIN, OUTPUT);
  
  digitalWrite(SENSOR_POWER_PIN, HIGH); 
  digitalWrite(SIREN_PIN, LOW);
  
  attachInterrupt(digitalPinToInterrupt(TAMPER_PIN), tamperInterruptHandler, RISING);
  DustSerial.begin(9600, SERIAL_8N1, 16, 17);

  LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO0);
  if (!LoRa.begin(868E6)) { 
    while (1); 
  }
}
void loop() {
  if (Serial.available() > 0) {
    handleLocalTerminal();
  }

  uint8_t frame[30];
  if (DustSerial.available() >= 32) {
    if (DustSerial.read() == 0x42 && DustSerial.read() == 0x4D) {
      DustSerial.readBytes(frame, 30);
      uint16_t pm25Raw = (frame[4] << 8) | frame[5];
      uint16_t pm10Raw = (frame[6] << 8) | frame[7];
      
      uint16_t pm10Corrected = (uint16_t)(pm10Raw * activeSlopeCorrection);

      if (pm10Corrected >= PM10_DANGER_LEVEL) {
        digitalWrite(SIREN_PIN, HIGH); 
      } else {
        digitalWrite(SIREN_PIN, LOW);
      }

      int rawAdc = analogRead(BATTERY_ADC_PIN);
      float vBat = (rawAdc / 4095.0) * 3.3 * 2.0;

      HighDensityPayload packet;
      packet.nodeId = 1; // Unique Node ID
      packet.pm25Packed = htons(pm25Raw);
      packet.pm10Packed = htons(pm10Corrected);
      packet.scaledBattery = (uint8_t)(vBat * 50.0);
      
      uint8_t flags = 0x00;
      if (hardwareTamperFlag) flags |= 0x80;
      if (isTerminalUnlocked) flags |= 0x40;
      packet.securityFlags = flags;

      uint8_t* byteBuffer = (uint8_t*)&packet;
      LoRa.beginPacket();
      LoRa.write(byteBuffer, sizeof(packet));
      LoRa.endPacket();

      if (hardwareTamperFlag) hardwareTamperFlag = false;
    }
  }
  delay(5000); 
}
void handleLocalTerminal() {
  String input = Serial.readStringUntil('\n');
  input.trim();
  if (!isTerminalUnlocked) {
    if (input == "AUTH:SecureMinesAdmin2026") {
      isTerminalUnlocked = true;
      Serial.println("ACCESS_GRANTED");
    } else {
      Serial.println("LOCKED_ERROR");
    }
  } else {
    if (input.startsWith("SET_CAL:")) {
      float targetSlope = input.substring(8).toFloat();
      flashMemory.putFloat("slope_mod", targetSlope);
      activeSlopeCorrection = targetSlope;
      Serial.println("CHANGES_SAVED");
    } else if (input == "LOGOUT") {
      isTerminalUnlocked = false;
      Serial.println("CONSOLE_SECURED");
    }
  }
}
