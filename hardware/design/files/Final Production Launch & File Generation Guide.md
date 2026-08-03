
Final Production Launch & File Generation Guide
To successfully submit this final design to JLCPCB or PCBWay for a manufacturing run of 5,000 units, configure export layers exactly as detailed below to lock in the ECX logo, Batch B01 code, and Laser-Engraved Tracking zones.

The 4-Layer Gerber File Export Checklist

When exporting fabrication data from KiCad or EasyEDA,  zip folder must contain these exact layer files:

1. Gerber_TopLayer.GTL (Layer 1): 
Component pads, 14-mil 50Ω antenna waveguide trace, and digital lines.

Gerber_InnerLayer1_GND.G1 (Layer 2): Unbroken solid ground plane sheet for RF wave matching.

Gerber_InnerLayer2_PWR.G2 (Layer 3): 3.3V and battery routes showing the physical 0.5 mm Isolation Moat Cutout.

Gerber_BottomLayer.GBL (Layer 4): Low-speed helper tracks and secondary ground fills.

Gerber_TopSilkscreen.GTO: Contains the sharp white ECX brand logo, the small "B01" batch code, and text outlines.

Gerber_TopSolderMask.GTS: Controls the dark green coating. Must include the 3.0 mm open circular windows for the 3 alignment fiducials and a bare square footprint area for the Laser Engraved Component Serial Number QR Code.

Gerber_Drill.DRL: NC Drill instructions mapping out the via stitch locations at a 1 mm pitch array configuration.




# Production & Launch Roadmap (Batch: B01)

```
 [ Week 1: Design Release ]        [ Week 2: DFM Inspection ]       [ Weeks 3-4: Factory Run ]
 Upload IPC-2581 file to           Factory engineers verify         LDI etching, CNC via drill,
 JLCPCB / PCBWay portal.           14-mil RF trace & 0.5mm moat.    SMT assembly, and FCT test.

 ```

 File Upload: Compress your exported layers along with the component coordinate tracking spreadsheet (CPL.csv) and your custom BOM.csv into a single .zip file and upload it directly to the manufacturer's portal.DFM Engineering Verification: The factory’s software will run an automated check to verify that your 1.0mm height ECX logo characters leave enough distance from component pins and that the 3 fiducial orientation dots match their machine cameras.Approve the Pre-Flashing Fixture: Provide your compiled production binary software file (.bin) containing the low-battery 3.0V deep sleep logic. The assembly floor will pre-flash this software onto the ESP32 modules before soldering.Execute Automated Manufacturing: Your batch rolls through high-speed SMT placement machinery and automated optical scanners. The laser tracking unit engraves a unique serial number string into the open copper window of each board next to your batch code.Quality Control Pass: The finished panel moves to a pogo-pin test rig. It tests charging protection limits and validates the radio frequency paths before packaging your completed tracking units into anti-static protective bags for delivery.
