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
    - High Level Reqs:
        1. The system must provide active postural restraining by applying corrective tension for 10 seconds until the user returns to a calibrated upright position, where the tension will be released after 10 seconds of consistent proper posture.
        2. The system must be able to distinguish between poor posture and natural movement by utilizing a time delay of 30 seconds after sensing a slouch event so that it is only triggered by a prolonged period of slouching.
        3. The vest must support daily tracking of user behavior with a wireless interface and a mobile app which will be calibrated for the user and allow them to visualize their postural habits and to adjust their preferred mode (brace or active).

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

**Date:** 2/15/2026
**Meeting Objectives:**
* Quick notebook updates
* subsystem clarification/block diagram

**Record:**
- Block Diagram (made by aparna)
<img width="974" height="791" alt="image" src="https://github.com/user-attachments/assets/759cac6e-05a1-4604-a4bf-8f0e637ebc89" />

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
      
* Website to refer back to:
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
* Lay out parts in KiCad

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
    - better for wearable device that is battery powered since it produces less heat
    - more efficient than a normal voltage regulator
* plan is to demo using LED to show when servo should be moving since we do not have them yet
    - demoing sensing subsystem
    - GOOD POSTURE: Under threshold, LED off
    - SLOUCHING: Over threshold, LED blinks, 30s timer counts up
    - ACTUATE: motors move to target angle
    - attach alligator clips to ends of stretch sensor-> acts as a resistor
        - more stretch: higher ADC values (should mean slouching)
        - less stretch: lower ADC values (should mean good posture)
    - use voltage divider circuit that aparna found online to do this:
      <img width="666" height="435" alt="image" src="https://github.com/user-attachments/assets/941131ba-42dc-4d47-a3b7-16087e3077f3" />
    - Example printouts of states in Arduino IDE (threshold=425 in this case)
      <img width="283" height="182" alt="image" src="https://github.com/user-attachments/assets/3866a0e1-44cf-492c-b4ff-90c178bb5036" />


**Date:** 3/23/2026

**Meeting Objectives:**
* Updates for notebook purposes on what has been done in the past weeks
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
    - Schematic (actuation and power routed by me)
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
* **ALL schematics for PCBs( main and front from other group members, but just to keep a record here):**
    - Main (microcontroller, connections to servo ttl conversion for A&P, etc):
      <img width="934" height="614" alt="image" src="https://github.com/user-attachments/assets/869d90ba-553e-49a0-9841-a50a4fc3d46a" />

    - Front panel (buttons for kill, EN, and BOOT):
  <img width="692" height="496" alt="image" src="https://github.com/user-attachments/assets/2e493a50-ae8b-4832-b844-db7c0025485a" />
  
    - Actuation and Power (voltage conversion, battery, motor powering, TTL conversion, etc):
<img width="974" height="493" alt="image" src="https://github.com/user-attachments/assets/0fd763ac-2b33-4728-873e-77685325d137" />
      


      
**Date:** 3/27/2026

**Meeting Objectives:**
* Meeting about next steps in breadboarding- planning to be able to demo all subsystems except the power (since we do not have regulators for breadboard)
* Meeting with seamstress this week over zoom to plan to sew our physical vest and get advice on tailoring
* This week's plan:
    - Individual reports - DUE WED
    - Keep working on breadboarding subsystems -DEMO NEXT WEEK
    - sew our base vest

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
* Figuring out how to do servo control with our control code and not FTServo

**Record:**
* for the motors we will be using this library's code: https://github.com/matthieuvigne/STS_servos/blob/main/src/STSServoDriver.cpp 
  <img width="1104" height="767" alt="image" src="https://github.com/user-attachments/assets/20406ea5-43d7-4194-a355-d2204fe9a11f" />
* Wireless: starting out with nRF connect
* ESP32 has library in arduino IDE for BLE support- we are using the BLE service template to support BLE
* Just wanna do a proof of concept- can BLE work before we try our own app?
* sent message "Hello World", now we want to try live updating using Notify
* Works! nRF output:
  <img width="373" height="810" alt="image" src="https://github.com/user-attachments/assets/e4d18475-cd1b-4d5d-bdf0-1e08700fad45" />


**Date:** 4/4/2026

**Meeting Objectives:**
* PCB orders are in
* Planning

**Record:**
* Physical PCBs came in
* PCB routing was done as follows (done when we ordered, but images here):
    - Actuation and Power:
      <img width="999" height="903" alt="image" src="https://github.com/user-attachments/assets/bf5d06ff-0356-4f39-aec9-545cbd22bcce" />

    - Main:
      <img width="974" height="569" alt="image" src="https://github.com/user-attachments/assets/de5656a9-120a-4302-bbd5-c8c6a5f83f12" />

    - Front Panel:
      <img width="901" height="792" alt="image" src="https://github.com/user-attachments/assets/4f3bc180-718a-41a5-9e60-6860f772761d" />

 
      

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
* Research/info:
    - Service UUID: Main BLE service we will use
    - Command Characteristic: Receives app commands
    - Data Characteristic: Sends posture/ status data
* BLE workflow:
    1. ESP32 advertises as APCV
    2. Scan/Connect in app
    3. Phone subscribes to BLE service UUID
    4. Phone subscribes to posture status Characteristic UUID
    5. ESP32 uses BLE Notify for updating
    6. App updates with status



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
2. App

**Record:**
* Decided on velcro to hold servos in place
* Velcro is the electrical cabling velcro-> extremely secure and pretty difficult to pull apart
* Servos seem pretty secure in the velcro and now its time for spool drafting
* Attached ribbon to be across back since that seems like the best place
  - posture is best corrected from the upper back
  - slouch is best detected near the belt area (mid - lower back)
* Finished BLE portion of app -> now need to test this on Aparna's Samsung device when she is back


**Date:** 4/20/2026

**Meeting Objectives:**
1. Finish physical vest assembly (spools)
2. Test motors on vest (not on human yet!!)

**Record:**
* Aparna is sick and unable to do the CAD, so we found it easier to machine the spools
    - Option 1: PVC spooling with removable ends **CHOSE THIS OPTION**
    - Option 2: Actual spool with dowel rod through middle for support
    - Option 3: All-plastic spool
  * We found that the PVC spooling was just light enough for the motors to handle while being the most development-friendly since we can remove the spool from the end to store the motors
* The PVC spool had the best results when testing on bench top
  - ribbon is reeled in more cleanly and the ends stop the cabling from getting too tangled
  - Ribbon easily slips off of the spool when unraveling, which is perfect!
* Code:
    - added an "unravel" state where after motor actuation, the servo motors will reverse direction when good posture is detected
    - If good posture is detected in the middle of the servos reeling in the cable, the motors should unwind since the user has recognized their own posture change
* SETBACK: Tried testing this setup with battery and blew out both of our servo motors
    - Now we placed an order for a new controller and 2 new servos-> coming soon
    - Have to use 1 servo and breadboard for mock demo since we are still soldering PCBs
    - Upon further inspection we think that out battery may have been delivering w=too much current to the servos, causing them to stall and for the coils to heat up way too much, as the motors were extremely hot to the touch
    - The controller was actually unharmed, and we can still use it in testing
 
**Date:** 4/22/2026

**Meeting Objectives:**
1. Testing Microcontroller PCB with the controller (and 1 motor for now)
2. Work on app

**Record:**
* We found that we had to resolder some parts of the Microcontroller PCB, as there was not enough on the pad.
* App developments:
    - app is pretty much fine and connects to the micro via BLE after some debugging
    - added a "scan for APCV" button where we can scan for the device, and once it is found, there is a "connect to APCV" button which will allow us to connect to it
    - now adding features and making sure we can send packets
    - Added "Live Data" panel which shows: Sensor 1 value, Posture state (goof, slouching, actuating), Move amount (which is set in code->essentially the calibrated data), and slouch threshold (set in code to decide good v bad posture)
    - App seems to be stuck on one screen -> I'm thinking this may be  a code issue but it could be an issue with the device?
 
**Date:** 4/23/2026

**Meeting Objectives:**
1. Working on app features

**Record:**
* Fixed scrolling issue -> just forgot to add the ScrollView to the view
* Added a way to configure motor target value (aka the degree to which it turns to correct posture)
    - In future applications I am thinking that this could be turned into a calibration feature on the vest if it were to be made in multiple different sizes
    - For our vest we can use this so we dont have to keep uploading code to the device during development
    - App interface reference pics:
      <img width="455" height="924" alt="image" src="https://github.com/user-attachments/assets/d820c0f9-b894-420f-a41e-d3923af042ad" />
    - controls in app:
      <img width="483" height="324" alt="image" src="https://github.com/user-attachments/assets/6da9f3ae-e5c4-4500-bae8-e261221a6a70" />
    - KILL switch active:
      <img width="483" height="707" alt="image" src="https://github.com/user-attachments/assets/484664ba-f362-4936-84f1-2ab1764156bc" />


**Date:** 4/24/2026

**Meeting Objectives:**
1. Brace mode addition
2. Refine Control Code
3. Tested Main PCB with Front Panel PCB

**Record:**
* Added Brace mode: vest should basically immediately reel in after this is set
    - Moves right to the target position
<img width="759" height="623" alt="image" src="https://github.com/user-attachments/assets/e2b92ac5-6dcc-41b4-bf05-8a4c70d7defa" />
* Toggles on app as well -> ACTIVE or BRACE will show
    - have to send this data packet to the app as well so it changes the command
* Tested this on benchtop and it seems to work!
* PCB testing was successful, and the front and main can be integrated together
    - Soldered Main PCB image:
      <img width="725" height="494" alt="image" src="https://github.com/user-attachments/assets/f0047bf6-3b9e-4d53-b05c-93b3b9dcd23c" />      

**Date:** 4/25/2026

**Meeting Objectives:**
1. Testing Power and Actuation PCB

**Record:**
* Final soldered PCB (without fuse in holder):
  <img width="751" height="695" alt="image" src="https://github.com/user-attachments/assets/e11ecc5d-88f9-4e3e-884a-45491393ae65" />
* Voltage reg works -> Can power micro with this
* Added the unspooling of motors after bring reeled in or if user goes back to good posture in the middle of actuation to release straps to a loose state
* Kill switch does not work on hardware
    - Thinking this may be a soldering issue since the board is very burnt
    - Workaround: Take out a stretch sensor and do it in software instead
    - Since we only use 1 stretch sensor down the back but we had room for two, we have an extra ground terminal to ground the button
    - We have an extra pin to wire for the ESP32 that we are now defining as kill -> we just wont use this for a hardware kill
    - We believe it is more important to have a kill button for safety reasons than to try to integrate that second stretch sensor because safety is much more improtatnt than being able to read sideways slouches -> front slouching is more common anyway and the best readings come from the mid back.
    - Using the power kill gpio pin for this now
  * Software KILL behavior:
      - if motors are actuating or are fully at target angle, unwind ribbon and stop until button is pressed again
      - if motors are at og loose position, do not actuate at all, stop reading sensors, and allow user to take vest off safely until button is pressed again
      - Essentially the button stops the program until the user presses the button again ->this can be seen in arduino ide
      - Adding to app as well!
  * soldered a capacitor between 3v3 and gnd near esp32 to prevent brownout issue that we have been having as well


**Date:** 4/25/2026

**Meeting Objectives:**
1. Attached PCBs to vest and physical calibration

**Record:**
* Finally sewed PCBs onto vest and attached everything as follows:
<img width="626" height="331" alt="image" src="https://github.com/user-attachments/assets/4f5f6cc0-a3d9-4b2a-87f9-0bd9e790cead" />
* Had to change some placements from og design doc setup due to physical vest sizing and size of spools
* Ribbon kept falling off of spools so we ended up attaching a cardboard piece to the end of them to keep the ribbon in place while servos reel in
* Need to do some fine-tuning with the code due to issues with outliers essentially stopping the slouch detection completely- will do next meeting

**Date:** 4/26/2026

**Meeting Objectives:**
1. Data smoothing
2. final tweaks to algo to meet high level reqs
3. Finalize app

**Record:**
* App packet includes:
    - S1 sensor reading
    - Posture status (aka GOOD, SLOUCHING, ACTUATING)
    - Mode (ACTIVE/BRACE/KILLED)
    - moveAmount (steps +500 or -500 button)
    - slouchThreshold (adjustable)
    - motorActuated (whether vest is tightened for brace mode/kill purposes)
* Tweaked the motor speed a bit so that the motors actually take 10s to reel in as per the high level requirement
    - verified w a stopwatch
* Decided on smoothing algo which takes
    - 15% of newest sensor reading
    - 85% of previous reading
* Makes the readings we get much more stable and now we have a much better slouch state identification:
  <img width="1040" height="161" alt="image" src="https://github.com/user-attachments/assets/0763ecde-4a45-47cd-9b5f-6fc4334e769d" />
* Final Control Flowchart:
  <img width="950" height="802" alt="image" src="https://github.com/user-attachments/assets/a512d955-93a6-4077-a539-9a759d90bb01" />

* Final BLE Flowchart
<img width="876" height="1173" alt="image" src="https://github.com/user-attachments/assets/4d373f17-0ead-4f24-8675-3357e921db60" />


 
