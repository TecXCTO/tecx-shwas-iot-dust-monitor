Preventing USB Charger Over-Voltage Burnout

To protect your circuit if someone accidentally plugs in a faulty, cheap, or high-voltage USB charger (like a 9V, 12V, or 20V Fast Charger) [1], you must add an OVP (Over-Voltage Protection) IC.The SGM2526 [4] or AOZ1321 [5] is the standard choice. This chip acts as an ultra-fast electronic fuse. If the incoming USB voltage is normal (4.5V to 5.5V), it lets the power pass through cleanly [4]. If the voltage spikes above 5.8V, it instantly clamps shut in less than 1 microsecond, completely disconnecting your downstream charger chip (CN3065) and battery from the high voltage [4].


# Fully Integrated Power, Protection, and Telemetry Circuit Map 

This master visual schematic shows exactly where to insert the Over-Voltage Protection chip, the battery status LEDs, and the ESP32 analog measurement traces.

```
 [ SOLAR PANEL + ] ------> [ SS34 DIODE ] ------------------------+
                                                                  |
 [ USB-C PORT 5V ] ------> [ SGM2526 OVP IC ] ---> [ SS34 DIODE ] -+----> [ V_EXT INPUT LINE ]
                           (Blocks >5.8V Inputs)                                   |
                                                                                   v
                                                                        [ CN3065 SOLAR CHARGER ]

                                                                           |     |        |
                                         (Red LED: Charging) <--- [CHG] ---+     |        |
                                      (Green LED: Charged) <----- [DONE] --------+        |
                                                                                          v
 [ ESP32 ANALOG PIN ]                                                           (4.2V Max Out)
       ^                                                                                  |
       | Clean Scaled Voltage                                                             v
 [ 10kΩ / 10kΩ RESISTOR DIVIDER ] <-------------------------------------+---> [ 3.7V LITHIUM BATTERY ]
 (Cuts voltage exactly in half)                                         |     (Monitored & Protected)
                                                                        v
                                                             [ AO3401A POWER-PATH SWITCH ]
                                                                        |
                                                                        v
                                                           [ TLV62569 BUCK REGULATOR ]
                                                                        |
                                                                        v (Exact 3.3V)
                                                             [ ESP32 & LoRa MODULES ]
  
  ```

Battery Life Monitoring Divider CalculationThe analog-to-digital converter (ADC) pins on the ESP32 can only read voltages up to 3.3V [6]. However, a fully charged Lithium battery reaches 4.2V [7]. Connecting the battery directly will burn out the ESP32 pin [6].To measure this safely, you must scale the voltage down using two 10kΩ high-precision resistors (1% tolerance) [8].1. Calculate the Voltage Split RatioWhen two resistors of equal value are placed in series, the voltage at the center node is split exactly in half [8]:\(V_{\text{out}}=V_{\text{bat}}\times \left(\frac{R_{2}}{R_{1}+R_{2}}\right)\)\(V_{\text{out}}=4.2\text{\ V}\times \left(\frac{10\text{\ k}\Omega }{10\text{\ k}\Omega +10\text{\ k}\Omega }\right)=2.1\text{\ V}\)2. Confirm Safety MarginThe resulting max voltage of 2.1V fits safely below the ESP32's 3.3V limit, leaving a wide safety buffer [6].3. Establish Software Translation FormInside your ESP32 software code, you can easily read the real-time battery condition by executing a basic scaling formula:\(\text{Actual\ Battery\ Voltage}=\text{Measured\ ADC\ Voltage}\times 2\)📦 Updated Advanced Subsystem Bill of Materials (BOM)Add these specialized components to your 4-layer FR4 board layout parameters:Component CategoryIndustrial Part NumberPackage Type (SMT)Target PurposeOver-Voltage ProtectorSGM2526 [4]SOT-23-5 [4]Hard firewall cutting off inputs over 5.8V [4].Telemetry Divider10kΩ Resistors (1% Tol) [8]0402Scales 4.2V down to 2.1V for safe ESP32 parsing [6, 8].Charging IndicatorRed SMD LED (0603)0603Connects to CN3065 CHG pin; lights up during active charge.Full Capacity IndicatorGreen SMD LED (0603)0603Connects to CN3065 DONE pin; lights up when cell hits 4.2V.LED Current Limiters470 Ohm Resistors0402Placed inline with LEDs to prevent them from burning out.📐 Restating System Configuration MetricsUnder full solar, external USB charge, and battery loop configuration, the following baseline electrical parameters must be enforced during layout design rules verification:✅ Power VerificationThe system uses the SGM2526 OVP IC to drop line input connections instantly if external USB supplies surge past 5.8V, ensuring zero downstream silicon damage [4].To ensure your final design docume
