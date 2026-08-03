# Master Supplier-Facing PCB Production Specification Map

This schematic is structured specifically for factory engineering review (Design for Manufacturing - DFM). It links your hardware components, protection circuits, and isolation trace tolerances directly to the production layout instructions.


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
|  |     =========================                                                |                      ||            |
|  |     *     340 ECX LOGO      *                                                |                      ||            |
|  |     * (H:1mm / L:0.15mm Ink) *   (::: Ground Surface Vias Stitching 1mm :::) |                      ||            |
|  |     =========================                                                |                      ||            |
|  +------------------------------------------------------------------------------+                      ||            |
|                                                                                                        ||            |
| ===== [ 5.0mm Bottom Clearance Waste Edge Rail Grip Margin with [Fiducial Dots Alignment Marks] ] =========== |
| [ V-SCORE MILLING ENVELOPE AXIS AXIS AXIS AXIS AXIS AXIS AXIS AXIS AXIS AXIS AXIS AXIS AXIS AXIS AXIS ]               |
+-----------------------------------------------------------------------------------------------------------------------+

```
# Factory-Facing Engineering Rule Checklist (For Your RFQ Submission)

When submitting your IPC-2581 or Gerber zip folder to the manufacturer's engineering team via their web portal, copy and paste these precise parameters into their manufacturing instruction text box:Stackup Architecture: Must be an industrial 4-Layer construction tracking a total finished board height thickness of exactly 1.6 mm using universal standard flame-retardant FR4 substrate laminates.Copper Weight Configuration: Set outer layers (Layer 1 and Layer 4) and internal planes (Layer 2 Ground and Layer 3 Power) uniformly to 1 oz (35µm) finished copper weight.Radio Waveguide Trace Constraints: The LoRa antenna signal path running on the top layer from the RFM95W module terminal directly to the SMA launch connector must track a Coplanar Waveguide with Ground (CPWG) design rule set to Width (W) = 14 mils and Clearance Gap (S) = 6 mils to isolate it cleanly against adjacent surface ground pours.Shielding Matrix Configuration: Apply automated Ground Surface Via Stitching (GSVS) lines surrounding the 14-mil waveguide track and bounding empty perimeter pour sectors using a tight 1 mm grid pitch to anchor structural ground loops down to Layer 2.Power Moat Construction Cut: Implement a vertical 0.5 mm physical copper cut isolation channel drawn exclusively on Layer 3 (Power Plane) to isolate the RF transceiver environment from high-frequency buck regulator noise loops.Silkscreen Logo Precision Specs: Imprint the "340 ECX" enterprise company brand logo on the top layer overlay using high-contrast white UV-curable epoxy ink. Enforce a minimum letter height of 1.0 mm, character line thickness of 0.15 mm, and a completely clear 0.5 mm physical bounding clearance window away from nearby footprints.Panelization Delivery Execution: Deliver the fabrication files structured as a panel array matrix utilizing V-Scoring mechanical groove cut patterns (leaving a 0.4 mm core ribbon) bordered by 5 mm top and bottom industrial waste edge rails populated with machine tooling holes and global camera alignment fiducials.Turnkey Automated Quality Assembly Checks: The production run requires automated Inline Automated Optical Inspection (AOI) alongside an automated In-Circuit/Functional Testing (ICT/FCT) jig layout configuration mapped to probe test points TP_VBUS, TP_VSOLAR, TP_VBAT, and TP_VCC_3V3 to isolate and flag short circuits or assembly defects automatically before distribution.
