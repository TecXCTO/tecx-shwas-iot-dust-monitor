# Manufacturing Specifications & Layer Stackup

To manufacture a high-performance 4-layer RF board, you should choose a standard 1.6mm total board thickness with a 1 oz (35µm) copper weight on all layers.Using standard JLCPCB or PCBWay 4-layer stackup parameters (specifically the JLC2313 prepreg structure), your layers must be arranged exactly like this:
```
[ LAYER 1: TOP COPPER ]     --- 1 oz (35µm)  <-- Components, 50Ω Trace, 10mil SPI
==== Prepreg Insulation ====    --- 0.21mm (8.26 mils) Thick FR4 (Dielectric Constant Er = 4.05)
[ LAYER 2: GND PLANE ]      --- 1 oz (35µm)  <-- Solid Ground Shielding (No cuts!)
==== Core Fiberglass ====       --- 1.06mm Thick Structural Center FR4 Core
[ LAYER 3: PWR PLANE ]      --- 1 oz (35µm)  <-- Power Traces (3.3V, Battery, Solar)
==== Prepreg Insulation ====    --- 0.21mm (8.26 mils) Thick FR4
[ LAYER 4: BOTTOM COPPER ]  --- 1 oz (35µm)  <-- Low-speed helper signal tracks
```

 # 50-Ohm Transmission Line Width & Clearance Calculations 
 
 to prevent radio signals from bouncing back and dropping your range, you must use a Coplanar Waveguide with Ground (CPWG) on Layer 1. Based on the 0.21mm prepreg distance to the Layer 2 ground plane, use these exact trace layout measurements in your software:RF Trace Width (W): 14 mils (\(0.356\text{ mm}\))Clearance Gap to Ground Pour (S): 6 mils (\(0.152\text{ mm}\))Stitching Via Diameter: 12 mils hole (\(0.3\text{ mm}\)) with a 24 mils pad (\(0.6\text{ mm}\)).Stitching Via Pitch (Spacing): Place a ground via every 40 mils (\(1\text{ mm}\)) along both sides of the RF trace to lock down the shielding.
