# Why Your 6V Solar Panel Will Not Burn Out the Board
  Your board will not burn out because the CN3065 Solar Charger IC acts as a dynamic safety barrier.The CN3065 has an absolute maximum input voltage rating of 6.5V. A standard "6V" solar panel actually outputs an open-circuit voltage around 6.0V to 6.2V in peak sunlight, which fits perfectly within the safe limits of this chip. The CN3065 takes that 6V input and automatically drops it down to a safe 4.2V max to charge the battery.

# Automatic Power Switching:
  How the System Works Simultaneously
  To run your device directly from the Solar/USB inputs while simultaneously charging the battery (and instantly switching to battery power when the sun goes down), you need a Power-Path Management Circuit.
  
  If you connect the charger output, the battery, and the system load all to the exact same line, the charger will get confused by the power being drawn by the ESP32. This can cause it to never stop charging, which damages the battery.
    
    To solve this, we add a P-Channel MOSFET (AO3401A) and a Schottky Diode (B130) to create an automatic hardware power switch.
    
How the Hardware Switches Power Automatically:Scenario A (Solar Panel or USB-C is Connected):
The incoming 5V/6V power automatically turns OFF the P-Channel MOSFET. The Solar/USB power flows directly into the TLV62569 Buck Regulator to run the ESP32 and LoRa chips. At the exact same time, any extra power goes into the CN3065 chip to charge the battery to its maximum capacity.
  
  Scenario B (Solar Panel is Dark & USB-C is Unplugged): The voltage on the circuit drops. The P-Channel MOSFET instantly turns ON automatically in less than a microsecond. The battery immediately takes over and supplies power to the Buck Regulator. Your ESP32 never resets or loses data because the switch is instantaneous
  
  Master Power-Path Schematic Circuit Diagram
  
  This is the exact circuit layout you must draw in your PCB software to handle simultaneous charging and automatic power switching safely:
  
```
  [ SOLAR PANEL + ] ----> [ SS34 DIODE ] ----+
                                             |
  [ USB-C VBUS 5V ] ----> [ SS34 DIODE ] ----+----> [ V_EXT INPUT LINE (5V-6V) ]
                                                            |
                +-------------------------------------------+--------------------+

                |                                                                |
                v                                                                v
     +--------------------+                                            +--------------------+

     |    CN3065 IC       |                                            |  AO3401A MOSFET    |
     | (Solar Charger)    |                                            | (P-Channel Switch) |
     +--------------------+                                            +---------v----------+

                |                                                                |
                v (4.2V Max Charging)                                            | (Instant Pass)

                |                                                                |
     [ 3.7V LITHIUM BATTERY ] <----> [DW01A PROTECTION IC]                       |

                |                                                                |
                +----------------------> [ B130 SCHOTTKY DIODE ] ---------------+
                                                                                 |
                                                                                 v
                                                                    [ MAIN SYSTEM POWER LINE ]
                                                                                 |
                                                                                 v
                                                                     [ TLV62569 BUCK REGULATOR ]
                                                                     (Steps down to stable 3.3V)
                                                                                 |
                                                                                 v
                                                                       [ ESP32 & LoRa MODULES ]

```

Updated Power-Path Bill of Materials (BOM)

Add these two critical surface-mount parts to your manufacturing list to build this automatic switching feature:

```
Component FunctionComponent Industrial NamePackage Type (SMD)PurposePower-Path SwitchAO3401A P-Channel MOSFETSOT-23Disconnects the battery when external Solar/USB power is active.Battery Isolation DiodeB130-13-F Schottky DiodeSOD-123Prevents external power from flowing backward into the battery.Pull-Up Resistor10k Ohm Resistor0402Keeps the MOSFET gate stable during power transitions.
```
