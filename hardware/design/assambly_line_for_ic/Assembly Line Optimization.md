# 1. Naked-Eye Company Logo Size Specifications

To make an English letter logo as small as possible while ensuring it is easily readable by the naked eye without a magnifying glass, you must follow these exact dimension constraints:Minimum Character Height: \(1.0\text{ mm}\) (\(40\text{ mils}\)). Anything smaller becomes difficult for normal 20/20 vision to parse instantly at a standard reading distance.Minimum Text Line Width (Thickness): \(0.15\text{ mm}\) (\(6\text{ mils}\)). If the lines forming the English letters are thinner than this, the factory's inkjet printer heads may fail to eject enough ink, causing the letters to look blurry or scratchy against the dark solder mask.Keep-Out Clearance: Leave a \(0.5\text{ mm}\) blank buffer zone entirely around the logo text. No components, bare pads, or solder lines should enter this zone to ensure the text remains clean and readable.


# 2. Automated Layout Verification:

Design Rule Check (DRC) SetupBefore sending your 4-layer design files to a manufacturing plant, you must configure the Design Rule Check (DRC) parameters inside your software. This acts as a digital inspector to catch short circuits or routing errors before printing.🟢 DRC Settings for KiCad (v7.0 / v8.0)Navigate to the top menu: File \(\rightarrow \) Board Setup \(\rightarrow \) Design Rules.Select Constraints and change these values:Minimum clearance: Set to 6 mil (\(0.1524\text{ mm}\)).Minimum track width: Set to 6 mil (Except your 14-mil antenna trace).Select Net Classes from the left list. Create a new net class named Power_Lines.Assign your battery, solar, and USB routes to this class and set their track thickness to 15 mil to handle power safely.Click OK. Run the checker by navigating to Tools \(\rightarrow \) Design Rules Checker \(\rightarrow \) click Run DRC. Fix any flagged errors until the report shows zero warnings.🔵 DRC Settings for EasyEDA (Standard / Pro)Navigate to the top workspace menu: Design \(\rightarrow \) Design Manager.Expand the Rules tab and select Default.Input these values directly into the matrix fields:Clearance: 6milTrack Width: 6milVia Diameter: 24mil (with a 12mil hole size parameter).Right-click on your workspace, select Real-time DRC, and turn it ON. This highlights any overlapping paths in bright red as you route.

#  3. Assembly Line Optimization:
V-Scoring Panelization LayoutFor a batch of 5,000 units, a factory cannot handle tiny, individual circuit boards. They will stall the pick-and-place conveyor machines. You must combine multiple individual boards into a single large frame using V-Scoring Breakaway Panels.


```
+-----------------------------------------------------------------------+

|  [ TOP CLEARANCE BORDER RAIL - 5mm WITH TOOLING HOLES ]               |
|  +--------------------+  V-Cut Groove  +--------------------+         |
|  |     PCB UNIT 1     |================|     PCB UNIT 2     |         |
|  | (ESP32/LoRa Board) |   (0.4mm left) | (ESP32/LoRa Board) |         |
|  +--------------------+                +--------------------+         |
|                       ======= V-Scoring Axis =======                  |
|  +--------------------+                +--------------------+         |
|  |     PCB UNIT 3     |================|     PCB UNIT 4     |         |
|  +--------------------+                +--------------------+         |
|  [ BOTTOM CLEARANCE BORDER RAIL - 5mm WITH FIDUCIAL MARKS ]           |
+-----------------------------------------------------------------------+
```
The Array Configuration: Create a \(2 \times 3\) or \(2 \times 2\) matrix panel arrangement.The V-Cut Groove Mechanism: The factory cuts a \(V\)-shaped notch halfway through the top and bottom faces of the FR4 panel, leaving a thin \(0.4\text{ mm}\) middle layer of fiberglass intact.Waste Rail Integration: Add a \(5\text{ mm}\) frame of raw fiberglass along the top and bottom borders of the panel. These rails give the automated assembly machines a surface to grip without scratching your components.Tooling Holes & Fiducials: Drill three \(3.2\text{ mm}\) unplated guide holes in the corners of the frame rails, and place three copper dots (\(1\text{ mm}\) diameter) as optical alignment marks (fiducials) for the camera systems.Post-Assembly Separation: After the components are soldered, you can easily snap the boards apart along the scored lines by hand or using an automated blade machine.

# 4. IPC-2581 Standard Manufacturing File Export

Modern assembly lines prefer a single IPC-2581 standard data file over traditional separate Gerber folders. This file combines your copper layouts, component coordinates, drill sizes, and Bill of Materials into one encrypted package.Steps to Export IPC-2581 from Common CAD Software:In Altium Designer: Navigate to File \(\rightarrow \) Export \(\rightarrow \) Select IPC-2581. Choose your target directory, select IPC-2581B as your output version variant, and click Generate.In KiCad (v8.0): Navigate to File \(\rightarrow \) Fabrication Outputs \(\rightarrow \) Select IPC-2581 (.xml). Set your units configuration to Millimeters and export the layout file directly.In EasyEDA Pro: Navigate to the top Export menu option \(\rightarrow \) click PCB Fabrication File (Gerber/IPC-2581) \(\rightarrow \) select the IPC-2581 file format checkbox option \(\rightarrow \) click Export.Submit this single file package directly to mass-production companies like JLCPCB or PCBWay to launch your automated turnkey assembly run.
