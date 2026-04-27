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

**Date:** 3/4/2026

**Meeting Objectives:**
* Design Review w TA and Professor

**Record:**
* Suggestions:
    - instead of Voltage Divider, do a voltage amplifier circuit for readings from stretch sensors
    - have a backup plan for the stretch sensors if they dont work: maybe pressure?
    - Make the status LED into something to signify that the vest is actually working- have it blink when theres bad posture and be lit up when there is good posture to be able to demo to professors
    - test the stretch sensors first

 **Date:** 3/9/2026

**Meeting Objectives:**
* Breadboard demo prep

**Record:**
* instead of voltage regulator: 3V-17V 1A Step-Down Converters with DCS-Control
    - why: more reliable
* plan is to demo using LED to show when servo should be moving
    - demoing sensing subsystem
 

 
**Date:** 3/23/2026

**Meeting Objectives:**
* Updates on what has been done in the past weeks
* plans
* Notes from TA meeting

**Record:**
* Updates:
    - working on PCB
    - Currently routing the power and actuation subsystem PCB in KiCad
    - Goal is to order PCB ourselves so it comes earlier
    - Rerouting the PCB according to TA meeting (discussed later)
* Plans:
    - Order PCB by tonight (Monday 3/23)
    - Work on breadboard demo stuff for this week (minus ttl converter and buck converter stuff)
    - Need to get subsystems working on the breadboard by Friday
    - Will create the physical vest on Sunday
* TA Meeting and General PCB info
    - Currently working on Power and Actuation PCB
    - Can not connect grounds bc we can connect them to ground plane under pcb
    - Use vias to make electrical connections through the front to the back of the board if routes are crossing
    - Use 1 layer for horizontal connections; Use 2nd layer for vertical
    - Schematic:
      <img width="1316" height="794" alt="image" src="https://github.com/user-attachments/assets/efb92b54-b1e2-4a67-bb55-fb77c58103b3" />
    - Current layout (before routing):
      <img width="776" height="720" alt="image" src="https://github.com/user-attachments/assets/b386e0ac-ee08-4c29-ae0a-0a11ff9b9086" />
    - Final layout: 
      <img width="768" height="703" alt="image" src="https://github.com/user-attachments/assets/ee14a1a0-93eb-449e-9fd5-deb579948154" />

**Date:** 3/26/2026

**Meeting Objectives:**
* still finishing up 1 pcb to order today
* possibly looking at some vest design ideas
    - will be more detailed on fabric and pcb layout on the vest early next week

**Record:**
* PCB ordered to Hub
* Starting to look at some ideas for 3D printed spools

      
**Date:** 3/27/2026

**Meeting Objectives:**
* Meeting about next steps in breadboarding- planning to be able to demo all subsystems except the power (since we do not have regulators for breadboard)
* Meeting with seamstress this week to plan to sew our physical vest
* This week's plan:
    - Individual reports - DUE WED
    - Keep working on breadboarding subsystems -DEMO NEXT WEEK

**Record:**
* Updates:
    - Splitting up work
    - 2 people on breadboarding subsystems
    - 1 person on 3D printing design
 

**Date:** 3/29/2026

**Meeting Objectives:**
* sew vest and fit to someone specifically

**Record:**
* using neoprene for vest- stretches but still durable
* rethinking strap placement- elastics stretch so they dont actually correct anything
    - thinking maybe ribbon or nylon for the fabric for this?
* we started to realize how important the physical vest design will be since different people get different readings
    - made vest to fit Sophia but could also fit Aparna
* still thinking about straps and placement of stretch sensors on vest but that will be another session
    - possibly thinking of crossing the ribbon/nylon straps still to be wound up by motors
    - place stretch sensors on their own from the shoulder to mid-back?
* FRONT:
  <img width="386" height="454" alt="image" src="https://github.com/user-attachments/assets/9ce8179d-cb51-4bfd-8792-6196f06ba283" />

* BACK:
  <img width="405" height="507" alt="image" src="https://github.com/user-attachments/assets/485b39a2-9231-49bc-b7fb-83d5fddf4b0a" />



**Date:** 3/30/2026

**Meeting Objectives:**
* Figuring out wireless

**Record:**
* for the motors we will be using this library's code: https://github.com/matthieuvigne/STS_servos/blob/main/src/STSServoDriver.cpp 
  <img width="1104" height="767" alt="image" src="https://github.com/user-attachments/assets/20406ea5-43d7-4194-a355-d2204fe9a11f" />
  



**Date:** 4/6/2026

**Meeting Objectives:**
* Testing PCBs and soldering

**Record:**
* To test everything:
    - reistance: top right button (ohms)
    - capacitance: shift then freq button
    - continuity is to see if anything is connected
* Bluetooth development
    - using nRF app on iphone to test connection
    - must use BLE for our implementation
    - currently printing state- should we also take samples of numbers or send over timer to app as well?


 **Date:** 4/7/2026

**Meeting Objectives:**
* sewing straps onto vest

**Record:**
* chose ribbon for straps since it should be durable enough + cheaper and easier to keep 1 size
* we found that attaching the ribbon to the front of the vest will be best
* crossed the ribbon in the back- did testing by pullung and it seems to correct posture very well!
* next step is to get the spools done and start doing some calculations with how much the motor should spin
* FRONT: **
* BACK: **
  


**Date:** 4/9/2026

**Meeting Objectives:**
* App dev

**Record:**
* Tools
    - Expo
    - EAS Build
    - Node.js
    - VS Code
    - Git
    - react-native-ble-plx
    - Android phone
    - nRF Connect
    - ESP32
* Steps
    - researched how to make an app that can communicate with the ESP32- BLE is only option
    - confirmed last week in BB demo that the Bluetooth connection to the ESP32 does work uring the nRF Connect app on iPhone
    - First tried making iPhone app->later switched to Andrioid due to subscription requirements on iPhone
    - We will be switching to an Android-only app (for now) to avoid extra costs
    - Chose to use Expo with a custom dev build because Expo Go does not support BLE (BLE needs native support)
    - installed Node.js, had VSCode, had Git
* Issues/Reworking
    - making an Android-only app bc we do not want to pay for Apple developer account; Android makes this easier

**Date:** 4/13/2026

**Meeting Objectives:**
* App dev

**Record:**
* Finished setting up app creation:
    - Created a new expo project in the terminal in the folder ece445_android_app->apcv-app
    - Configured EAS build for Android-only
    - Generated Android keystore for app signing
    - Resolved some setup issues->mostly Powershell script restrictions/build config
    - getting a QR code was a SUCCESS!
* Link to download app on Android: https://expo.dev/accounts/jordynandrews/projects/apcv-app/builds/6d55fa9b-23c0-4794-a790-f7da39d999aa
* QR code to download app:
  <img width="1443" height="775" alt="image" src="https://github.com/user-attachments/assets/be9171c8-97bb-40bb-a953-33cfdd85e570" />




**Date:** 4/14/2026

**Meeting Objectives:**
* Finalizing schedule and timeline/ due dates

**Record:**
* My objectives:
    - finish app basic+testing: WED
    - finish full app: FRI
    - sew straps and attach motors: SAT
 

  
**Date:** 4/15/2026

**Meeting Objectives:**
* Working on app

**Record:**
* Thinking I should make something to toggle bluetooth?
    - That way I can test the app on my computer (UI stuff mostly) without Aparna's phone
* Decided to make an app interface that doesnt use bluetooth for initial UI testing
* Startup of app on aparna's phone: npx expo start on computer
  
**Date:** 4/16/2026

**Meeting Objectives:**
1. Testing PCB with motor controllers

**Record:**
* When we plugged in 1 motor, the code was simple and worked very well and consistently on the breadboard setup
* Had issues when using two motors- 1 moves and 1 does not
* First fix was to change the servo IDs-> since both were 1 before we are now using 1 and 3 for the IDs
* Still not moving with arduino but moving with Feetech FDServo interface using sync write command


**Date:** 4/17/2026

**Meeting Objectives:**
1. Continuing testing PCB with motor controllers
2. Fixing 2 servo issues

**Record:**
* Before we were trying to write to the motors in the same command using an array:
  <img width="628" height="149" alt="image" src="https://github.com/user-attachments/assets/6101b65e-4a31-4d27-86d3-e2102804fee8" />
* We now added a delay and write to them separately since the lines seemed to have been getting overwritten for one servo when trying to get both to move:
  <img width="646" height="111" alt="image" src="https://github.com/user-attachments/assets/d6c49dc1-1602-4e93-a0dd-4ee1200efb83" />
* Also, to reel in the vest properly, the motors would have to move opposite ways
* We set the servos in mode 3: 360 mode so they will move past the 4096 value, as we need to be able to fully reel in the straps


  
**Date:** 4/18/2026

**Meeting Objectives:**
1. Physical vest assembly

**Record:**
* Need to test the 2 servo reel-in on a physical vest now-> not on a human yet though while we are tweaking algo; just to see if the straps can reel in
* Officially decided on ribbon for straps; has enough give to be safe but also reels in very well and fixes posture
    - Elastic straps give too much and need to be reeled in and stretched way too far to fix posture
* Had to take in the og vest because it needs to be tighter to actually reel in; we have pretty much settled on Sophia being the model for it since the vest fits her well
* Holding servos is an issue-> how do we keep them exposed while still having them be secure?

  

**Date:** 4/19/2026

**Meeting Objectives:**
1. Physical vest assembly

**Record:**
* Decided on velcro to hold servos in place
* Velcro is the electrical cabling velcro-> extremely secure and pretty difficult to pull apart
* Servos seem pretty secure in the velcro and 

* SETBACK: Tried testing this setup with battery and blew out both of our servo motors
    - Now we placed an order for a new controller and 2 new servos-> 



