To determine the actual physical dimensions of final printed circuit board assembly (PCBA), we must calculate the surface area required to host all your selected components (ESP32, LoRa module, Type-C port, solar inputs, battery connector, buzzer, and safety circuits) while keeping a safe distance between high-power radio lines and noisy power components.The best calculated dimensions for your custom board layout are 80 mm (Length) × 50 mm (Width), with a standard 1.6 mm substrate thickness.

# 1. Detailed Internal Component Space Breakdown
To ensure your enclosure fits everything perfectly, use these exact physical sizes and layout rules during your final mechanical CAD enclosure design step:

ESP32-WROOM-32E Footprint: Requires 18 mm × 25.5 mm of clear surface area on the left side.RFM95W LoRa Module Footprint: Requires 16 mm × 16 mm of space on the far right edge.Power Subsystem (OVP, Charger, Buck): Takes up roughly 30 mm × 20 mm in the top corner.Safety Clearance Zone: Includes the critical 0.5 mm isolation moat gap running vertically through the board, separating the digital section from the radio components.Antenna Protrusion Distance: The threaded SMA Edge-Mount Connector extends out past the right edge of the PCB panel frame by exactly 9.5 mm. Your enclosure must feature a circular opening hole matching this protrusion vector.

# Mechanical Outline & Enclosure Alignment Map
This mechanical drawing shows the physical locations of your 3.2 mm mounting holes, the alignment of the protruding connectors, and the exact dimensions of the layout boundaries.

```
       |<======================= 80.0 mm PCB Length =======================>|

---+   +--------------------------------------------------------------------+   +---
 ^ |   | (O) [3.2mm Hole]                                  [3.2mm Hole] (O) |   |

 | |   |                                                                    |   |
 | |   |  +------------+                                      +----------+  |   |
 | |   |  | USB-C Port |                                      |  RFM95W  |  |   | ===> [SMA Antenna Jack]
50 |   |  | (Flushed)  |                                      |  Module  |  |   |      (Extends 9.5mm
mm |   |  +------------+                                      +----------+  |   |       past PCB edge)

 | |   |                                                                    |   |
 | |   | (O) [3.2mm Hole]                                  [3.2mm Hole] (O) |   |
 v |   +--------------------------------------------------------------------+   +---
---+   |<--- 5.0mm --->|                                      |<--- 5.0mm ->|
       
       * Note: Mounting hole centers are spaced exactly 5.0mm away from all outer board edges.
 ```

#  Step-by-Step Enclosure Design Instructions
Set Up Corner Standoffs: Place four internal plastic or brass mounting posts inside your enclosure base, spaced exactly to line up with the board's four 3.2 mm corner mounting holes. Use standard M3 screws to securely lock the board into place.Cut the USB-C Port Opening: Cut a rectangular slot measuring 10.0 mm × 4.5 mm on the left wall of your enclosure. This allows standard USB-C charging cables to snap flush into the board's port.Drill the SMA Antenna Hole: Drill a circular opening with a 6.5 mm diameter on the right side wall of your enclosure. This lets the threaded barrel of the SMA connector protrude cleanly outside the box, allowing users to screw on an external high-gain LoRa antenna.

#  Dimensions Summary

The physical dimensions for your 4-layer FR4 tracking module are exactly 80 mm × 50 mm × 1.6 mm. This footprint is perfectly optimized to house all protection systems, custom logos, and tracking marks within a compact, cost-effective enclosure structure.
