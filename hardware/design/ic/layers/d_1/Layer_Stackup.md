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
