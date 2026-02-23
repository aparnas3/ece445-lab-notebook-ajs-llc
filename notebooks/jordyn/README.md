**Date:** 1/28/2026

**Meeting Objectives:**
1. Rethink ideas- our original ideas were too simple, and we want something with more hardware.
2. Once we come up with a viable idea, make a new web board post to be reviewed.
3. Create a draft RFA to bring to office hours tomorrow for review.

**Record:**
* We came up with an initial idea for a posture-correcting device that would also have an app. The basic design would consist of the following
  - a tight-fitting wearable vest (athletic material)
  - servo motors* in the back
  - elastic connected to servo motors that will wind up to fix bad posture
  - pressure sensor in front of vest to sense when the person is slouching
 * Some features we are thinking of implementing:
     - it would straighten the person's back with elastics, then release when they are at the correct posture so the person has to work at staying upright by themselves
     -  We would create an app that allows people to actually set paramaters and track their posture records
     -  We would also have a way in the app to set a "brace mode" for back injuries
     -  Stretch goal: maybe a weight sensor to be able to trach how much load you are putting on your shoulders
* Rough sketch:
<img width="814" height="367" alt="image" src="https://github.com/user-attachments/assets/9680d46f-c0f9-44ef-b0bb-05318bcf1bc3" />


**Date:** 2/10/2026

**Meeting Objectives:**
1. Start drafting our project proposal more formally (focusing on intro and ethics portions)
2. Go over TA notes and apply to our proposal (I specifically need to edit the high-level requirements) 

**Record:**
* TA Meeting:
    - Created meeting schedule: Mondays @ 10am in lab
    - Locker and code: A7 (27-15-01)
    - Feedback on my section (high-level requirements): quantify it all; for #1, should be saying how long it will take to reach upright position and how long until the tension is released after posture is corrected.
 
* Team meeting
    - Finished up high-level requirements and first draft of problem/solution
    - created a rough draft diagram
![apcv_diagram](https://github.com/user-attachments/assets/c71aadd4-90c3-4ecc-860f-c7440dbd53e4)


**Date:** 2/13/2026

**Meeting Objectives:**
* Finish up Proposal and get technical details down

**Record:**
* Physical:
    - Pull straps diagonally from each shoulder and tighten around waist for posture correction
* Mechanical:
    - Dynamixel XL430-W250-T motor seems to be the safest option for a wearable device but very expenseve (~$27)
    - Cheaper option (~$20) and stronger: FeeTech 7.4V 19kg serial bus servo w/ current feedback **going with this option**
      
| Feature | Waveshare SC15 | FeeTech STS3215 | DYNAMIXEL XL430-W250-T | Recommendation | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Max Stall Torque** | 17 kg·cm (8.4V) | 30 kg·cm (12V) | 15.3 kg·cm (12V) | FeeTech | FeeTech has the highest raw power. |
| **8kg Load Suitability** | Risky (Near 100% capacity) | Safe (26% capacity) | Capable (Near 50% capacity) | FeeTech | FeeTech is highly durable for this specific load. |
| **Best Feedback Metrics** | Position, Load, Speed, Voltage | Current, Load, Position, Speed, Temp | Position, Velocity, PWM, Temp. | FeeTech | Provides current and temperature monitoring. |
| **Rotation Mechanism** | 180° Servo / 360° Motor | 360° Magnetic Encoder | 360° Contactless Encoder | DYNAMIXEL | Uses the most advanced encoder type. |
| **Gear Material** | High-precision Metal | Steel | Engineering Plastic | FeeTech/Waveshare | Metal/Steel gears generally offer better durability. |
| **Approx. Price** | **$18.00** | $21.00 – $28.00 | $27.50 – $45.00 | Waveshare | Most budget-friendly option. |

* ECE:
    - ESP32 microcontroller has bluetooth capabilities which would be good for what we wanna do


**Date:** 2/17/2026

**Meeting Objectives:**
* Finish Team Contract
* Send parts we want ordered to Frey
* Research good PCB design practices
* Start our design in KiCad (aka figure out what parts we want on our PCB)

**Record:**
* Research Findings on good PCB layout (with RF)- theory:
    - For RF pcb designs we need to consider signal integrity (proper trace design), impedance matching (target for RF traces is ~50 ohms), EMI and noise (sensitive to interference from nearby components/external sources), and material selection (moght need specialized substrates- Rogers/Teflon)
    - RF signals are like waves -> can radiate energy and interfere w other signals
    - IMPEDANCE MATCHING: must match impedance of source, transmission line, and load (common is 50 ohms)
    - wider traces are NOT better for RF signals -> calculate this based on operating frequency

* Applicable PCB design tips:
    - MATERIAL: Rogers 4350 B or PTFE-based laminates are preferred (low loss and stable performance at frequencies > 4350B)
    - LAYERING (4-layer ex from source): Top Layer: RF traces and components; Layer 2: Ground plane for shielding; Layer 3: Power plane; Bottom Layer: Additional routing or ground
    - TRACE WIDTH: calculate to match impedance (often 50 ohms for RF lines)
    - TRACE LENGTH: keep short to avoid signal delay
    - CORNERS: avoid sharp corners for traces->use 45-degree bends or curved traces
    - GROUND PLANE: avoid splitting ground plane under RF traces
      
* Websites to refer back to:
    - https://www.allpcb.com/allelectrohub/beginners-guide-to-rf-pcb-design-from-theory-to-practice
 
**Date:** 2/18/2026

**Meeting Objectives:**
* Lay out parts in KiCad for schematic; connections tomorrow

**Record:**
* Machine shop parts:
  - LM3940IT-3.3V Regulator
  - 10 uF and 0.1 uF capacitors
  - 6mm tactile switches
  - 10kOhm resistors
  - MTA-100 Headers (6-pin)
  - 22 AWG Stranded Wire
  - AZ1117 Voltage regulator   

* Parts for TA to order:
  - ESP32 Microcontroller
  - Adafruit (PID:519) stretch sensors
  - FeeTech STS3215 Servo Motors
  - 7.4V Battery

 
**Date:** 2/19/2026

**Meeting Objectives:**
* Lay out parts in KiCad and connections tomorrow

**Record:**
* Servo documentation (more detailed): file:///C:/Users/jordy/Downloads/Communication_Protocol_Manual.pdf
* voltage regulator: AZ1117

**Date:** 2/23/2026

**Meeting Objectives:**
* TA meeting

**Record:**
* proposal edits:
  - edit high level requirements (1st and 2nd are too similar)
  - define problem more clearly
  - force units measurement are not correct- should have newtons in the measurement?
  - Q: edit proposal and re turn in or just fix for design doc? fix for design doc

* other notes
  - checked out ESP32 dev board for breadboard testing



