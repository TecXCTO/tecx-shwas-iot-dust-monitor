================================================================================
PCB FABRICATION SPECIFICATION & IMPEDANCE CONTROL REQUIREMENT
================================================================================
PROJECT NAME         : Shwas IoT Dust Monitoring System
TARGET BOARD COUNT   : [Insert Quantity, e.g., 10 / 50 / 100]
TOTAL LAYER COUNT    : 4 Layers
FINISHED THICKNESS   : 1.6 mm ± 10%
COPPER WEIGHT        : 1 oz (35um) Outer Layers / 1 oz (35um) Inner Layers
BASE MATERIAL        : FR4 Standard Tg (Minimum 140°C)
SOLDERMASK COLOR     : Matte Black [Or your choice: Green/Blue]
SILKSCREEN COLOR     : White
SURFACE FINISH       : ENIG (Electroless Nickel Immersion Gold) - MANDATORY

--------------------------------------------------------------------------------
1. CRITICAL LAYER STACKUP MATRIX
--------------------------------------------------------------------------------
Layer 1 (Top)    : Signal Copper (1 oz / 35um)
  |--- Dielectric: 0.21 mm Prepreg (FR4, Target Dk = 4.3)
Layer 2 (Inner1) : SOLID GROUND PLANE (1 oz / 35um)
  |--- Dielectric: 1.00 mm Rigid Core (FR4, Target Dk = 4.3)
Layer 3 (Inner2) : POWER RAIL PLANE (1 oz / 35um)
  |--- Dielectric: 0.21 mm Prepreg (FR4, Target Dk = 4.3)
Layer 4 (Bottom) : Signal Copper (1 oz / 35um)

--------------------------------------------------------------------------------
2. MANDATORY IMPEDANCE CONTROL SPECIFICATION
--------------------------------------------------------------------------------
- TARGET NET NAME          : RF_ANT_LORA (Located exclusively on LAYER 1)
- TRANSMISSION LINE STYLE  : Coplanar Waveguide with Ground (CPWG)
- DESIGNED TRACE WIDTH     : 0.355 mm (14 mils)
- DESIGNED CLEARANCE GAP   : 0.152 mm (6 mils) to surrounding Layer 1 Ground
- TARGET RF IMPEDANCE      : 50 Ohms ± 10%

FABRICATOR NOTE: If your internal factory material stackup varies from the 
dimensions listed above, you are explicitly authorized to make minor adjustments 
to the L1 trace width and gap clearances to maintain the strict 50 Ohm target. 
Please notify the designer if adjustments exceed ±15% of designed trace widths.
================================================================================
