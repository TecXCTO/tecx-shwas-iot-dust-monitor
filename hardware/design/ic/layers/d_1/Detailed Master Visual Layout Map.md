# Fully Detailed Master Visual Layout Map

This diagram illustrates how all SMD components, the isolation moat, and the calculated 50-ohm waveguide fit together on your top layer.

```
+---------------------------------------------------------------------------------------------------------------+

|  [ POWER & CHARGING ZONE ]                                                                                    |
|  (Top Left Corner)                                                                                            |
|  [USB-C] --> [SS34 Diode] --+                                                                                 |
|                             |                                                                                 |
|  [SOLAR] --> [SS34 Diode] --+--> [CN3065 CHARGER] <=======> [JST BATTERY PORT] <---> [DW01A + FS8205S GUARD]   |
|                                         |                                                                     |
|                                         v (Filtered via 10uF + 100nF SMD caps)                                |
|                               [TLV62569 BUCK SWITCHER] <--- (Kept far away from LoRa antenna zone)            |
|                               (2.2uH Inductor + 22uF Cap)                                                     |
|                                         |                                                                     |
|  +--------------------------------------v------------------------+                     || [ RF RADIO ZONE ]   |
|  | [ MAIN DIGITAL ZONE ]                                         |                     ||                     |
|  |                                                               |                     ||  +---------------+  |
|  |   +-----------------------+                                   |                     ||  |  RFM95W LORA  |  |
|  |   |    ESP32-WROOM-32E    |                                   |  INTERNAL GROUND    ||  |    MODULE     |  |
|  |   |  (Microcontroller)    |                                   |  ISOLATION MOAT     ||  +-------v-------+  |
|  |   +-----------------------+                                   |  (0.5mm Copper Cut) ||          | (ANT Pin) |
|  |         |   |   |   |                                         |                     ||      (W=14mil)      |
|  |         |   |   |   |                                         |                     ||   :::|::: (S=6mil)  |
|  |      [4x 22-Ohm Resistors]                                    |                     ||   :::|:::           |
|  |         |   |   |   |                                         |                     ||   :::|::: (Via Rows)|
|  |         +---+---+---+====== 10mil SPI Data Tracks ===========>=====================>||==>:::|:::           |
|  |                                                               |                     ||      v              |
|  |  (oooooooooo Ground Vias Stitching Every 1mm oooooooooo)      |                     ||  [SMA CONNECTOR]    |
|  +---------------------------------------------------------------+                     ||  (Edge Launch)      |
+---------------------------------------------------------------------------------------------------------------+
```

# Step-by-Step Layout Instructions For Your SoftwareDrop the Components: 

Place the USB-C, Solar pads, CN3065, and TLV62569 in the upper left corner. Place the ESP32 in the center-left. Place the RFM95W and SMA Connector strictly on the right side.Cut the Moat: Draw a 20 mil (0.5mm) wide cutout line down the right-center of your board on Layer 3 (Power). Make sure the only traces crossing this moat are your 4 SPI data lines. Keep Layer 2 (Ground) completely solid and uncut.Draw the Antenna Trace: Draw a perfectly straight line from the RFM95W module's ANT pin to the center pin of the SMA edge connector. Set its width to 14 mils.Isolate the Antenna Trace: Flood Layer 1 with copper ground pour, but set the clearance rule specifically around that antenna trace to 6 mils.Stitch the Ground Vias: Place a row of ground vias directly along both sides of your 14-mil antenna trace, spaced roughly 40 mils (1mm) apart from each other. Scatter identical ground vias across all remaining empty spaces on the board to complete the shielding cage.
