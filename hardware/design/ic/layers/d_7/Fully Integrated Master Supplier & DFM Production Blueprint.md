# 1. Automated Component Tracking Number:

How it WorksTo track thousands of manufactured boards as a company, you cannot print a static number onto the board. Every single board needs its own unique tracking identity.To achieve this without increasing your printing costs, modern automated factories use a process called Laser Marking / Laser Engraving.During Stage 5 (Solder Mask & Silkscreen) of the manufacturing process, after the white epoxy ink company logo is printed, the panel is passed into a high-precision Industrial Fiber Laser Marking Machine.The machine reads the unique serial database for your batch.It uses a micro-laser beam to vaporize away a tiny section of the green solder mask layer, exposing the shiny copper underneath in the shape of a Machine-Readable 2D DataMatrix QR Code and a Human-Readable Serial Number String (e.g., SN-2026-00001 through SN-2026-05000).This tracking marker is placed in a designated empty clearance zone on your board. As each unit rolls off the reflow line, automated scanners log its test results directly to your quality database.

  # Fully Integrated Master Supplier & DFM Production Blueprint
  
  This updated engineering blueprint updates your company logo to the corrected "ECX" text branding, establishes the precise Laser Engraving Tracking Number Zone, and adds the necessary machine-alignment Fiducial Points.
  
```
  +-----------------------------------------------------------------------------------------------------------------------+

| MANUFACTURING PANEL IDENTIFIER BOUNDARY                                                                               |
| (O) [3.2mm Tooling Hole]                                                                   (O) [3.2mm Tooling Hole]   |
| ===== [ 5.0mm Top Clearance Waste Edge Rail Grip Margin for Automated Factory Conveyor Machine Belts ] ============== |
|                                                                                                                       |
|  [ SOLAR INPUT PAD ] --> [SS34 Diode] ---+                                                                            |
|                                          |                                                                            |
|  [ USB-C 16-PIN ] -----> [SGM2526 OVP] --+---> [ V_EXT INPUT LINE ]                                               |
|                             |                    |                                                                    |
|     (OVP Fault Line)        |                    v                                                                    |
|                             |             [CN3065 CHARGER IC]                                                         |
|                             |              |    |       |                                                             |
|                             |    (CHG) ----+    |       v (4.2V Max Charging Profile)                                 |
|                             |    (DONE) --------+       |                                                             |
|                             |                           v                                                             |
|                             |               [JST-PH 2.0mm BATTERY CONNECTOR] <---> [DW01A+FS8205S TELEMETRY PROTECTION]   |
|                             |                           |                                                             |
|                             |                           v                                                             |
|                             |               [AO3401A P-CHANNEL POWER-PATH]                                            |
|                             |                           |                                                             |
|                             |                           v                                                             |
|                             |               [TLV62569 BUCK SWITCHER]                                                  |
|                             |               (2.2uH Inductor / 22uF Cap) ===> [TP_VCC_3V3 Test Point]                  |
|                             |                           |                                                             |
|                             v                           v                                                             |
|  ===========================|===========================|============================================================ |
|                             | [FAULT ALARM STRAP]       | (Clean 3.3V DC Power Bus Line)                              |
|                             |                           |                                                             |
|  +--------------------------v---------------------------v--------------------+                      || [ RF ]    |
|  |  [ DIGITAL ZONE - LAYER 1 COMPONENT FLOOD POUR ]                             |                      ||            |
|  |                                                                              |                      || +-------+  |
|  |     +-------------------------+            [10k/10k DC Resistor Divider]     |                      || | LoRa  |  |
|  |     |   ESP32-WROOM-32E       | <========= (Battery Life Voltage Node)        |                      || | MODULE|  |
|  |     |  (Primary Processor)    |                                              |  POWER ISOLATION     || |RFM95W |  |
|  |     +-------------------------+                                              |  MOAT GAP            || +---+---+  |
|  |        |    |    |    |   |  |                                               |  (0.5mm Core Cut on  ||     |      |
|  |        |    |    |    |   |  +==> [GPIO 13] -> [MMBT3904] -> [5V BUZZER]     |   Layer 3 Power Only)||  (14mil W/  |
|  |        |    |    |    |   |                                  (Siren Alert)   |                      ||   6mil S    |
|  |        |    |    |    |   +=====> [GPIO 4]                                   |                      ||  Waveguide)
|  |        |    |    |    |           (OVP Trip Input Capture)                   |                      ||     |      |
|  |        |    |    |    |                                                      |                      ||     v      |
|  |     [4x 22 Ohm Signal Resistors]                                             |                      || [SMA JACK] |
|  |        |    |    |    |                                                      |                      || (Antenna)  |
|  |        +----+----+----+========== 10mil SPI Data Bridge Lines ===============|======================||=====>       |
|  |                                                                              |                      ||            |
|  |     =========================             ==============================     |                      ||            |
|  |     *       ECX LOGO        *             *  LASER ENGRAVED TRACKING   *     |                      ||            |
|  |     * (H:1mm / L:0.15mm Ink) *             *  NUMBER SERIAL/QR ZONE     *     |                      ||            |
|  |     =========================             ==============================     |                      ||            |
|  |                                                                              |                      ||            |
|  |                                      (::: Ground Surface Vias Stitching 1mm :::) |                      ||            |
|  +------------------------------------------------------------------------------+                      ||            |
|                                                                                                        ||            |
| ===== [ 5.0mm Bottom Clearance Waste Edge Rail Grip Margin with [*] [Fiducial Dots Alignment Marks] ] ======= |
| [ V-SCORE MILLING ENVELOPE AXIS AXIS AXIS AXIS AXIS AXIS AXIS AXIS AXIS AXIS AXIS AXIS AXIS AXIS AXIS ]               |
+-----------------------------------------------------------------------------------------------------------------------+
  ```
#   2. Factory Positioning Alignment: Placing Fiducial Marks
      
      Automated SMT pick-and-place machines move at incredible speeds, placing dozens of SMD components every second. To prevent the machine components from being soldered crooked or off-center, the machine uses optical cameras to calibrate its position using Fiducial Marks.Exact Physical Layout Constraints for Your Software:The Shape: A fiducial mark is a simple, bare, round copper dot on the top layer.Copper Dot Diameter: 1.0 mm (40 mils).Solder Mask Opening (Clearance Area): 3.0 mm (120 mils). This means you must draw a circular window in your software's solder mask layer centered over the copper dot so no green mask covers it. The surrounding bare FR4 backing acts as a high-contrast dark border for the machine's camera lens.Quantity and Placement Locations:Place exactly three global fiducial marks on the outer breakaway frame rails of your panel in an L-shaped pattern. This allows the machine to calculate the panel's width, height, and any rotational skew on the conveyor belts.Place two local fiducial marks at diagonal corners immediately outside the footprints of your finest-pitch components—specifically right next to the ESP32 module and the SGM2526 OVP chip. This guarantees the pins align perfectly with the copper pads before reflow soldering.

#     3. Standard Factory Assembly Database Bill of Materials (BOM)
        
        Save this data exactly as a standard comma-separated value spreadsheet (.csv) to upload into the automated turnkey parts compiler at JLCPCB or PCBWay:
```
        Comment,Designator,Footprint,LCSC Part Number,Description
ESP32-WROOM-32E-N8,U1,SMD-Module,C701341,Dual-Core MCU 8MB Flash Module
RFM95W-915S2,U2,SMD-Castellated,C90023,LoRa Transceiver Module 915MHz
CN3065,U3,SOP-8_EP,C35123,Solar Li-Ion Charger IC
SGM2526-1YTN5G/TR,U4,SOT-23-5,C420456,Over-Voltage Protection Fuse Switch
DW01A,U5,SOT-23-6,C2314,Battery Protection Controller
FS8205S,Q1,TSSOP-8,C8205,Dual N-Channel MOSFET Protection Switch
AO3401A,Q2,SOT-23,C3401,P-Channel Power-Path MOSFET Switch
TLV62569DBVR,U6,SOT-23-5,C12569,1.5MHz Synchronous Buck Regulator
2.2uH Power Inductor,L1,SMD-4040,C4040,Shielded High-Current Inductor 2A
22uF X7R Cap,C1,0805,C22610,Ceramic Filter Capacitor 10V
10uF Tantalum Bulk,C2 C3 C4,Case-A_3216,C10610,Low-ESR Bulk Tantalum Capacitor
100nF X7R Decoupling,C5 C6 C7,0402,C10402,High-Frequency Bypass MLCC Cap
10k Ohm Resistor 1%,R1 R2 R3,0402,C1002,Precision Telemetry & Gate Pull-Ups
22 Ohm Signal Resistor,R4 R5 R6 R7,0402,C220,SPI Line Dampening Resistors
MMBT3904,Q3,SOT-23,C3904,NPN Transistor Buzzer Switch
5V Active Buzzer,LS1,SMD-8585,C8585,Magnetic Audible Indicator Beeper
Red SMD Alert LED,LED1,0603,C603R,Hardware OVP Warning LED indicator
Green Status LED,LED2,0603,C603G,Battery Fully Charged Status Light
SMA Edge-Mount Connector,J1,SMD-Launch,C5050,50-Ohm Threaded Female Antenna Jack
USB Type-C 16-Pin,J2,SMD-MidMount,C1616,Power Input Charging Interface
JST-PH 2.0mm Header,J3,SMD-RightAngle,C2020,Lithium Battery Plug Attachment Pad
  ```

  Step-by-Step Software Tracking Integration Instructions🟢 Implementing inside KiCad (v8.0)Open the Footprint Editor. Press A to add a pad. Set shape parameters to Circle, Layer to F.Cu (Top Copper), and set the diameter dimensions to 1.0mm.Add a second pad on top of the first. Change its type parameter configuration to Aperture. Set Layer to F.Mask (Top Solder Mask) and set its diameter layout property to 3.0mm. Save this item to your project library database as Fiducial_1mm_3mm.Open your board workspace. Press O to add a footprint, select your new custom fiducial, and drop it onto your frame boundary rails.For the tracking text layer, press T to generate a text string box. Type SN-{PANEL_ID} inside the text window, set its target assignment layer to F.SilkS (Top Silkscreen), and set its size metrics to Height: 1.0mm and Thickness: 0.15mm. Position it cleanly alongside your custom ECX brand logo.🔵 Implementing inside EasyEDA ProOpen your layout project panel workspace canvas. Go to the top primary window utility selector bar: Place → select Fiducial Mark.Click directly onto your workspace grid to stamp the alignment marks at diagonal corners outside the outline edge parameters of your ESP32 module.To open space for the factory tracking number, go to the drawing panel, select Solid Region, and draw a small rectangular box near the edge of the board. Double-click the box and change its type attribute rule parameter to Expose Copper (Solder Mask Layer Layer Opening Cut). This gives the factory's automated fiber-laser system a clear metallic canvas to engrave your unique product serial numbers and tracking QR codes.
