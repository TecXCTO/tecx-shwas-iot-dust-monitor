```
[ STAGE 1: DUAL-INPUT POWER ENTRY & LIGHTNING PROTECTION FIREWALL ]
                                      
  (Solar Panel +) ──► [ 10A FUSE ] ──► [ SMAJ6.0A TVS LIGHTNING DIODE ] ──► [ SS34 DIODE ] ───┐
                                                       │                                      │
  (USB-C VBUS 5V) ──► [ SGM2526 OVER-VOLTAGE PROTECTION IC (Clamps >5.8V) ] ──► [ SS34 DIODE ] ├─► Net: +V_EXT
                                                       │                                      │    (Main Power Trunk)
                                                       └─► [FAULT PIN] ──► Net: OVP_ALERT ───┘
                                                                                 │
                                                                                 v
                                                                        [ ESP32 GPIO PIN 4 ]
                                                                     (Triggers Software Alarm)

========================================================================================================================

[ STAGE 2: SOLAR CHARGING & SMART THERMAL BATTERY ENVIRONMENT INTERFACE ]

                                  [ CN3065 SOLAR CHARGER IC ]
                                        │               │
  Net: +V_EXT ──────────────────────────┤               ├─► [ CHG PIN ]  ──► [ 470Ω ] ──► [ RED CHARGING LED ]
                                        │               ├─► [ DONE PIN ] ──► [ 470Ω ] ──► [ GREEN FULL LED ]
                     (TEMP PIN 6) ◄─────┤               │
                           │            └───────┬───────┘
                           ├─► [ RT1: 10kΩ NTC THERMISTOR ] (Sourced as Murata C19313 / Soldered on Layer 1)
                           │   (Pressed flat beneath 5000 mAh Pouch Cell; freezes Solar/USB charge if Temp > 45°C)
                           └─► [ R14: 10kΩ FIXED RESISTOR (1%) ] ──► Net: GND
                                                │
                                                ▼ (4.2V Max Main Output Profile)
                                  Net: +V_BAT_RAW ──► [ JST-PH 2.0mm PORT (C149175) ] ──► [ 5000 mAh LiPo BATTERY ]
                                        │
                                        ▼
                          [ DW01A + FS8205S CELL GUARD IC ] ──► Cuts battery if voltage deep-drains down to emergency 2.4V

========================================================================================================================

[ STAGE 3: AUTOMATIC POWER-PATH RUNTIME & COLD SWITCHING REGULATORS ]

                      Net: +V_BAT_RAW (From Battery via AO3401A P-Channel MOSFET Switch)
                                     │
            ┌────────────────────────┴────────────────────────┐
            │                                                 │
            ▼ (Parallel DC Power Input Rail)                  ▼ (Parallel DC Power Input Rail)
  [ TLV62569 SYNCHRONOUS BUCK REGULATOR ]           [ TLV61046A SYNCHRONOUS BOOST REGULATOR ]
  - 1.5MHz Step-Down Switching Converter            - 1.5MHz Step-Up Switching Converter
  - 2.2µH Shielded Inductor (L1) / 22µF Cap         - 4.7µH Shielded Inductor (L2) / 10µF Cap
  - Operating Efficiency: 95% (Zero Heat)           - Operating Efficiency: 92% (Zero Heat)
            │                                                 │
            ▼ (Net Class: 20mil Copper Width)                 ▼ (Net Class: 30mil Copper Width)
  Net: +3V3_PWR (Layer 3 Polygon Island)            Net: +5V_BOOST (Layer 3 Polygon Island)
            │                                                 │
            v                                                 v
  [ STAGE 4: DIGITAL SYSTEM & DATA COMMUNICATION BUS ]  [ STAGE 5: ENVIRONMENTAL SAMPLING ]
            │                                                 │
            ├─► [ ESP32-WROOM-32E MICROCONTROLLER ]            └─► [ SENSIRION SPS30 DUST SENSOR ]
            │     - Pin 34 ◄── [ 10k/10k Divider ] ◄── +V_BAT      - Laser Particulate Counter (PM2.5/PM10)
            │     - Pin 16 ◄═══ (UART2 RX2 Data Bus Line) ════════ - Active Internal 60mA Sampling Fan [2.2]
            │     - Pin 17 ════ (UART2 TX2 Data Bus Line) ═══════► - Mounted behind IP67 Side Air Shutter Grille
            │                                                       (Protected by 0.45um Hydrophobic Membrane)
            ├─► [ 10mil High-Speed SPI Communications Bridge ]
            │     - MOSI / MISO / SCK / CS Pins 
            │     - Traverses across a hard internal **0.5 mm Power Isolation Moat Channel** on Layer 3
            │     - Dampened by **four 22 Ohm inline resistors** to trap signal noise spikes completely
            │
            ▼
  [ RFM95W LoRa MODULE ] ──► Net: RF_ANT (Layer 1 Coplanar Waveguide Track: Width = 14 mils / Clearance Gap = 6 mils)
                               │
                               ▼ (Bounded on both sides by 1 mm pitch Ground Surface Via Stitching arrays)
                       [ SMA EDGE-LAUNCH CONNECTOR (C5050) ] ──► [ EXTERNAL HIGH-GAIN LoRa ANTENNA POLE ]

========================================================================================================================

[ STAGE 6: ANTI-HACKING SECURITY DETONATOR SWITCHES & AUDIO SIREN ]

  [ 3M 1181 ANTI-DRILL INTERNAL COPPER WALL MESH ] ──► [ Harwin S7061 Pogo-Pin Pad J4 ] ──► [ ESP32 GPIO PIN 14 ]
                                                                                                 │
                                                                                                 ▼ (If cut or breached)
                                                                                     [ HARD HARDWARE SELF-DESTRUCT ]
                                                                                     - Wipes 256-Bit AES Encryption Keys
                                                                                     - Erases App Flash Storage Partitions
                                                                                     - Bricks bootloader permanently

  [ CASE LID MATING THREADS ] ──► [ NC MICRO-LIMIT TAMPER SWITCH ] ──► [ ESP32 GPIO PIN 5 ] ──► Trips alarm if box is unscrewed
                                                                           │
                                                                           ▼
                                                                  [ ESP32 GPIO PIN 13 ]
                                                                           │
                                                                           ▼ (Active High Drive Signal)
                                                                  [ 10kΩ Base Resistor ]
                                                                           │
                                                                           ▼
                                                                  [ MMBT3904 NPN TRANSISTOR ]
                                                                           │
                                                                           ▼ (Completes ground return line path)
                                                                  [ 5V ACTIVE MAGNETIC SIREN BUZZER ]
                                                                   (Emits a full-volume continuous beeping alarm)
```
