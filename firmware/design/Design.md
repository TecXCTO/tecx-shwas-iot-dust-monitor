```
+=======================================================================================================================+

| [ OUTSIDE FIBER-REINFORCED PLASTIC ENCLOSURE ENVELOPE - IP67 LEVEL WATERPROOF DESIGN ]                                |
|                                                                                                                       |
|  [ TOP LID: SLANTED 15-DEGREE ROOF ] ──► [ 6V MONOCRYSTALLINE SOLAR PANEL ]                                           |
|                                                     │                                                                 |
|                                                     ▼ (Through IP68 Gasket Entry Hole)                                |
|  [ SOLAR LINE ] ──► [ SMAJ6.0A TVS LIGHTNING DIODE ] ──► [ SS34 Diode ] ──+                                           |
|                                                                           │                                           |
|  [ USB-C 16-PIN ] ──► [ SGM2526 OVER-VOLTAGE FIREWALL ] ──► [ SS34 Diode ] ─+─► [ V_EXT INPUT LINE ]                  |
|                                                                                      │                                |
|                                                                                      ▼                                |
|                                                                             [ CN3065 SOLAR CHARGER IC ]               |
|                                                                             [Pin 6 TEMP] ──► [ 10k NTC Thermistor ]   |
|                                                                                      │      (Halts charging if >45°C) |
|                                                                                      ▼                                |
|  +───────────────────────────────────+                                  [ JST PH SHROUDED PLUG ]                      |
|  | [AIR INTAKE VENT GRID WITH SLATS] |                                               ▲                                |
|  | [0.45um Hydrophobic Membrane ]    |                                               │                                |
|  |  SPS30 LASER COARSE DUST SENSOR   | ◄─── (Powered by 5V Boost Line) ──────────────┼── [ 5000 mAh LiPo BATTERY ]    |
|  +─────────────────┬─────────────────+                                               │                                |
|                    │ (UART-2 Data Stream Lines: GPIO 16 / 17)                        ▼                                |
|                    │                                                    [ AO3401A POWER-PATH SWITCH ]                 |
|                    │                                                                 │                                |
|                    │                  +──────────────────────────────────────────────┴──────────────────────────────+ |
|                    │                  ▼ (Battery Input Power)                                                       ▼ |
|                    │     [ TLV61046A SYNCHRONOUS BOOST ]                               [ TLV62569 SYNCHRONOUS BUCK ]  |
|                    │     (4.7uH Inductor / 10uF Cap)                                   (2.2uH Inductor / 22uF Cap)    |
|                    │                  │                                                             │                 |
|                    │                  ▼ [ POLYGON: 5V_BOOST ]                                       ▼ [ POLYGON: 3V3_PWR ]

|  ==================│==================│=============================================================│================ |
|                    v                  │                                                             │ (Clean 3.3V)    |
|  +-----------------│------------------│-------------------------------------------------------------v----------------+ |
|  |  [ DIGITAL ZONE │ LAYER 1 TOP COMPONENT SURFACE FLOOD POUR ]                                                     | |
|  |                 │                  │                                                                              | |
|  |     +-----------v-------------+    │                                                                              | |
|  |     |   ESP32-WROOM-32E       | ◄──┘                                                                              | |
|  |     | (256-Bit Flash Encrypted| <═══════════════════════ [10k/10k Resistor Divider] (Battery Voltage Telemetry)   | |
|  |     +-------------------------+                                                                                   | |
|  |        │    │    │    │    │                                                                                      | |
|  |        │    │    │    │    +──► [GPIO 14] ◄── [ J4 BRASS POGO-PIN PAD ] ◄── [ 3M 1181 ANTI-DRILL COPPER WALL MESH ]  | |
|  |        │    │    │    │                       (Wipes internal flash memory partition instantly if cut or breached)| |
|  |        │    │    │    +───────► [GPIO 5]  ──► [ NC Lid Micro-Switch Tamper ] (Trips alarm if casing is unscrewed)    | |
|  |        │    │    │                                                                                                | |
|  |        │    │    +───────────────► [GPIO 13] ──► [ MMBT3904 Transistor ] ──► [ 5V ACTIVE AUDIBLE SIREN BUZZER ]       | |
|  |        │    │                                                                                                     | |
|  |     [4x 22Ω Inline Resistors]                                                                                     | |
|  |        │    │                                                                                                     | |
|  |        +----+──────────────── High-Speed 10mil SPI Data Communications Bridge ─────────────┐                     | |
|  |                                                                                                    │                     | |
|  |     ============    =============                                                                  ▼                     | |
|  |     * ECX LOGO *    * BATCH B01 *  (::: Ground Surface Vias Stitching 1mm Pitch Cage Matrix :::) [RFM95W LoRa MODULE]     | |
|  |     ============    =============                                                                  +-------┬----------+  | |
|  +------------------------------------------------------------------------------------------------------------│----------+  |
|                                                                                                               │             |
|                                                                                                   (14mil W / 6mil S CPWG Tr)|
|                                                                                                               │             |
|                                                                                                               ▼             |
|  (O) [3.2mm M3 Corner Mounting Hole]                                                     [3.2mm Hole] (O)   [SMA CONNECTOR] |
|                                                                                                             (LoRa Antenna)  |
|  ===== [ 5.0mm Panel Waste Edge Rail ] ========= [*] [Fiducial Orientation Camera Alignment Marks] ============│============ |
|  [ MACHINE READABLE LASER ENGRAVED SECTOR ] ──► [ AUTOMATED SEQUENTIAL QR CODE & HUMAN READABLE SERIAL STRING ]│             |
+=======================================================================================================================+
```
