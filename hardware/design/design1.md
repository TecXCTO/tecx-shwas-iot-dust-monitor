```
+=======================================================================================================================+

| [ TOP FACE EXTERNAL SURFACE ]: Angled 15-Degree Monocrystalline Solar Panel                                           |
|                                                     │                                                                 |
|                                                     ▼ (Through IP68 Waterproof Cable Gland Terminal)                  |
|  [ SOLAR LINE ] ──► [ 10A FAST BLOW FUSE ] ──► [ SMAJ6.0A TVS SURGE DIODE ] ──► [ SS34 Diode ] ──+                     |
|                                                                                                  │                    |
|  [ USB-C 16-PIN ] ──► [ SGM2526 OVER-VOLTAGE FIREWALL ] ──► [ SS34 Diode ] ──────────────────────+─► [ INPUT LINE ]  |
|                                                                                                             │         |
|                                                                                                             ▼         |
|                                                                                                    [ CN3065 CHARGER IC ]

|                                                                                                    [Pin 6 TEMP]       |
|                                                                                                         │             |
|  +───────────────────────────────────+                                                                  ▼             |
|  | [SIDE WALL: AIR SHUTTER GRILLE]   |   [ JST PH SHROUDED PLUG ] ◄── [ 10k NTC THERMISTOR RT1 ] (Battery Temp Guard) |
|  | [0.45um Hydrophobic Membrane ]    |              ▲                                                                 |
|  |  SPS30 LASER COARSE DUST SENSOR   | ═════════════┼══ [ 5000 mAh LiPo BATTERY POUCH ] (Mounted inside at the base)  |
|  +─────────────────┬─────────────────+              │                                                                 |
|                    │ (UART-2 Data Stream Lines)     ▼                                                                 |
|                    │                  [ AO3401A POWER-PATH SWITCH ]                                                   |
|                    │                                 │                                                                |
|                    │            +────────────────────┴────────────────────+                                           |
|                    │            ▼ (Battery Input Power)                   ▼ (Battery Input Power)                     |
|                    │   [ TLV61046A SYNCHRONOUS BOOST ]           [ TLV62569 SYNCHRONOUS BUCK ]                        |
|                    │   (4.7uH Inductor / 10uF Cap)               (2.2uH Inductor / 22uF Cap)                          |
|                    │            │                                         │                                           |
|                    │            ▼ [ POLYGON: 5V_BOOST ]                   ▼ [ POLYGON: 3V3_PWR ]                      |
|  ==================│============│=========================================│========================================== |
|                    v            │                                         │ (Clean 3.3V)                              |
|  +-----------------│------------│-----------------------------------------v----------------------------------+        |
|  |  [ DIGITAL ZONE │ LAYER 1 TOP PCBA COMPONENT SURFACE SURFACE POUR ]                                       |        |
|  |                 │            │                                                                            |        |
|  |     +-----------v-----------+│                                                                            |        |
|  |     |   ESP32-WROOM-32E     |◄┘                                                                            |        |
|  |     | (256-Bit Flash Encrypt)<════════════════════ [10k/10k Resistor Divider] (Battery Voltage Telemetry) |        |
|  |     +-----------------------+                                                                             |        |
|  |        │    │    │    │                                                                                   |        |
|  |        │    │    │    +──► [GPIO 14] ◄── [ J4 BRASS POGO-PIN PAD ] ◄── [ 3M 1181 ANTI-DRILL COPPER MESH ]  |        |
|  |        │    │    │                       (Wipes internal flash memory partition instantly if cut or breached) |        |
|  |        │    │    +───────► [GPIO 5]  ──► [ NC Lid Micro-Switch Tamper ] (Trips alarm if casing is opened)     |        |
|  |        │    │                                                                                             |        |
|  |        │    +───────────────► [GPIO 13] ──► [ MMBT3904 Transistor ] ──► [ 5V ACTIVE AUDIBLE SIREN BUZZER ]|        |
|  |     [4x 22Ω Inline Resistors]                                                                             |        |
|  |        │    │                                                                                             |        |
|  |        +----+──────────────── High-Speed 10mil SPI Data Communications Bridge ─────────────┐              |        |
|  |                                                                                            │              |        |
|  |     ============    =============                                                          ▼              |        |
|  |     * ECX LOGO *    * BATCH B01 *  (::: Ground Vias Stitching 1mm Pitch Cage Matrix :::) [RFM95W LoRa MODULE]      |
|  |     ============    =============                                                          +───────┬──────+        |
|  +----------------------------------------------------------------------------------------------------│──────+        |
|                                                                                                       │               |
|                                                                                             (14mil W / 6mil S Track)  |
|                                                                                                       │               |
|                                                                                                       ▼               |
|  (O) [3.2mm M3 Corner Mounting Hole]                                             [3.2mm Hole] (O)   [SMA CONNECTOR]   |
|                                                                                                     (Threaded Jack)   |
|  ===== [ 5.0mm Panel Waste Edge Rail ] ========= [*] [Fiducial Optical Alignment Marks] ==================│========== |
|  [ MACHINE READABLE LASER ENGRAVED SECTOR ] ──► [ AUTOMATED SEQUENTIAL QR CODE & SERIAL STRING ]          v           |
+=======================================================================================================================+

```
