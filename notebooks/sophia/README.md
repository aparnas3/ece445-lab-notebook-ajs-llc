


# Sophia Sulkar Worklog

Project: Active Postural Correction Vest

Group: 65

Purpose: This lab notebook documents my weekly project progress, design decisions, meeting notes, testing plans, and photo/figure evidence for the Active Postural Correction Vest.

# Week of January 26, 2026 - Initial Posture Corrector Idea Notes


We came up with a new idea and started to brainstorm ways to accomplish it. 


**Problem**: People slouch a lot when studying/sitting for long periods. Reminders are easy to ignore and normal braces can be uncomfortable + don’t really “train” you.

**Concept**: Make a wearable vest that can gently guide you back into good posture using elastic straps + small motors.


**How it detects slouching** :

- Put stretch sensors in the elastic straps.

- User does a quick calibration: sit/stand with good posture → record the “target” stretch value.

- When the user slouches, the strap stretch changes → sensor reading moves away from target.

- Motors pull/reel the straps until the stretch sensors return to the target range.
  

**Safety/comfort** :

- Add pressure sensors on the front to make sure the straps aren’t pulling too hard / tension is comfortable.

- Motor stops if pressure goes above a limit.
  

**Modes**:

- Training mode: pull to correct posture, then release so you learn the feeling and maintain it yourself.

- Brace mode: hold the corrected posture (keeps tension and makes small corrections).


**PCB/back of vest**:

- PCB + battery + motor drivers + Bluetooth (for app)

- Connects to stretch sensors + pressure sensors + motors


**App**:

- Tracks posture behavior (how often/how long you slouch)

- Lets you adjust sensitivity + max tension

- Switch between training vs brace mode



We also discussed how  wise it would be the vest, the app, and then if we have time we would include a vibration feature that
lets you know when your shoulders are not level and if you need to correct yourself in that direction. Essentilly we would consider these 
stretch features


**Stretch Sensor idea**: Think of a stretch sensor like a ruler for your elastic strap.

A stretch sensor changes its electrical value as the strap gets longer/shorter, so you can measure:
Current strap stretch = how long/tight the strap is right now
If your motor pulls the strap, the stretch sensor reading changes immediately. So the sensor gives you feedback on how much you pulled.

You don’t “guess” how much to pull. You run a simple feedback loop:

1. Calibrate the target

2. Have the user sit/stand in “good posture”

3. Record the stretch sensor value → call this S_target

4. Measure slouching

5. When they slouch, their posture changes and the strap stretches differently → sensor reads S_now

6. Compute error
error = S_target − S_now (or the opposite depending on sensor direction)

7. Move motor until error is ~0

- Motor reels in/out until S_now ≈ S_target

- That’s “how you know how much to move” — you keep moving until you hit the target value.


**Here is our rough draft drawing**

![IMG_1678](https://github.com/user-attachments/assets/38638719-575c-4795-894f-8f172de8d14d)


# Week of February 9, 2026 

# 2026-02-10 Starting Proposal and meeting with TA

This week, we met with our TA to discuss the project idea and receive feedback on our initial block diagram. The meeting helped us clarify the main subsystems of the project, including sensing, control, actuation, power, and the app/Bluetooth interface.

After the meeting, I worked on the visual aid for the project proposal. Our main goals were to strengthen the proposal and clearly explain how each subsystem would contribute to the full vest. We focused on showing how the stretch sensors would provide posture information, how the ESP32 would process the data, and how the servo motors would apply corrective tension.

**Tentative block diagram**

![1000000875](https://github.com/user-attachments/assets/0bed5b8a-3fd3-41d2-b9f9-e7bb7fcce6c0)

# 2026-02-13 - Materials Table/Prices

 I worked on comparing possible actuation components and researching stretch sensors. We compared several servo options, including the Waveshare SC15, FeeTech STS3215, and DYNAMIXEL XL430-W250-T. The FeeTech option appeared to be the strongest candidate because it provided high torque, useful feedback metrics, and a suitable operating range for our actuation needs.

I also researched conductive rubber cord as a possible stretch sensor. Conductive rubber cord behaves like a variable resistor because its resistance increases as it is stretched. This makes it useful for measuring strap extension in the vest. The plan was to pair the conductive rubber cord with a fixed resistor in a voltage divider circuit so that the ESP32 could read a changing voltage through its ADC.

This week helped us narrow down the sensing and actuation approach. By the end of the week, we had a stronger idea of how the vest could measure posture changes and how the motors could provide corrective force.


| Feature | Waveshare SC15 | FeeTech STS3215 | DYNAMIXEL XL430-W250-T | Recommendation | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Max Stall Torque** | 17 kg·cm (8.4V) | 30 kg·cm (12V) | 15.3 kg·cm (12V) | FeeTech | FeeTech has the highest raw power. |
| **8kg Load Suitability** | Risky (Near 100% capacity) | Safe (26% capacity) | Capable (Near 50% capacity) | FeeTech | FeeTech is highly durable for this specific load. |
| **Best Feedback Metrics** | Position, Load, Speed, Voltage | Current, Load, Position, Speed, Temp | Position, Velocity, PWM, Temp. | FeeTech | Provides current and temperature monitoring. |
| **Rotation Mechanism** | 180° Servo / 360° Motor | 360° Magnetic Encoder | 360° Contactless Encoder | DYNAMIXEL | Uses the most advanced encoder type. |
| **Gear Material** | High-precision Metal | Steel | Engineering Plastic | FeeTech/Waveshare | Metal/Steel gears generally offer better durability. |
| **Approx. Price** | **$18.00** | $21.00 – $28.00 | $27.50 – $45.00 | Waveshare | Most budget-friendly option. |


STRETCH SENSORS: 
https://www.adafruit.com/product/6379?gad_source=1&gad_campaignid=21079227318&gbraid=0AAAAADx9JvRWYU5tJsMEXvWKXJLSAmWvC&gclid=CjwKCAiAtLvMBhB_EiwA1u6_Pnn6ahT9QPF7mxnxF1kEBRIVxbh8-vFY-_DceWhQ5l1bP-qh_47wfBoCBFIQAvD_BwE

Conductive rubber cords behave like a variable resistor: when you stretch them, their resistance increases (usually nonlinearly) because the conductive pathways inside the material get pulled apart.

So you can treat it like:

Shorter / less stretched → lower 𝑅
More stretched → higher 𝑅

Then you convert that changing resistance into a voltage our ESP32 can read.

We will use a conductive rubber stretch cord as a resistive stretch sensor. The cord’s resistance increases with strap extension. We read this using a 3.3V voltage divider into the ESP32 ADC (with an RC low-pass filter), and detect slouch by thresholding the calibrated upright baseline.

<img width="1050" height="513" alt="Screen Shot 2026-05-07 at 9 16 37 AM" src="https://github.com/user-attachments/assets/0483aa92-609d-4080-ad82-ad5a03a1b2cf" />


# Week of February 16, 2026 - Team Contract, Parts Ordering, and KiCad Planning
This week, our goals were to finish the team contract, send our desired parts list for ordering, research good PCB design practices, and begin planning the schematic in KiCad. I focused on how the power and actuation system would be organized electrically.

For the power architecture, we planned to use a 2S battery pack with a nominal voltage of 7.4 V as the main source rail. This rail would be split into two branches. One branch would power the motors, while the other branch would go through a voltage regulator to create a 3.3 V rail for the ESP32 and sensing circuitry.

We also began identifying important schematic labels and system connections. The motor rail was labeled as a 7.4 V rail, and the logic rail was labeled as 3.3 V. The ESP32 would need 3.3 V and ground connections, and the stretch sensors would connect to ADC inputs. This helped define the early structure of the schematic before moving deeper into PCB layout.


KiCad Schematic Notes:

Actuation & Power:
-- 2S 18650 battery pack (7.4V) as main source rail (label it VBAT_7V4)
-- split into two branches
    Motor rail: VBAT_7V4 → E-STOP → VMOTOR_7V4 (proposal says the kill switch is on the motor power path)
    Logic rail: VBAT_7V4 → Voltage Regulator → +3V3 (proposal says regulator makes stable 3.3V for ESP32 + sensors)


Control:
-- Power: +3V3 and GND to the ESP32
-- ADC inputs: at least one pin labeled like STRETCH1_ADC (proposal: ESP32 reads stretch sensor voltages through ADC)


# Week of February 23, 2026- TA Meeting Suggestions

This week, we met again with our TA and received feedback on the design document. The main suggestions were to improve the high-level requirements, fix the tolerance analysis units, add test points, define how much slouch the system should detect, add schematics for each subsystem, and explain how ADC readings would be converted into tension or posture-related values.

This feedback helped us identify areas of the design that needed to be more specific and testable. In particular, the sensing subsystem needed a clearer explanation of how raw ADC readings would become useful posture information. We also needed to make sure each subsystem had measurable requirements that could be verified later.

After this meeting, I focused on improving the way we described the sensing and calibration process. I also began thinking more carefully about where test points should be included on the PCBs so that voltage rails and important signals could be checked during bring-up.


# Week of March 2, 2026- Sensor and Calibration Design Development

This week, I worked on developing the sensor signal-processing and calibration approach for the conductive rubber cord. Since the sensor behaves as a stretch-dependent variable resistor, the first step was to determine how its resistance could be converted into a measurable voltage for the ESP32.

The sensing circuit uses a voltage divider made from the conductive rubber cord and a fixed resistor. The ESP32 reads the voltage divider output through an ADC input.
1. The raw ADC value can first be converted into a voltage using: Vout = (ADCraw/ADCmax)*Vref
2. Then, using the voltage divider relationship, the sensor resistance can be calculated as: Rsensor = Rfixed*(Vout/Vref-Vout)
3. After calculating the sensor resistance, the system compares it to a baseline resistance value measured during upright posture. The change in resistance can be calculated as: delta R = Rsensor - R0
4. This value can be normalized as: delta R/R0
5. The normalized resistance change can be used during calibration to relate sensor output to strap tension. A possible relationship is: Tension = a (delta R/R0) + b

This week was important because it gave the sensing subsystem a clear mathematical path from physical strap stretch to an electrical signal that the controller can use.

<img width="754" height="514" alt="Screen Shot 2026-05-07 at 9 30 30 AM" src="https://github.com/user-attachments/assets/75558410-3a56-4c66-b791-62a4bbc60375" />


# Week of March 9, 2026- Breadboard Demo Notes and Servo Communication

This week, we worked on the breadboard demo and continued refining the power and communication design. One key point was that the servo motor requires 7.4 V, while the ESP32 and logic circuitry require 3.3 V. Therefore, our design needs a voltage regulator or buck converter to step the battery voltage down to a stable 3.3 V rail.

<img width="425" height="460" alt="Screen Shot 2026-05-07 at 9 32 39 AM" src="https://github.com/user-attachments/assets/541ed938-d082-4d7d-ad39-7c78e99c34cd" />


I also researched the communication interface between the ESP32 and the smart servo data line. The servo uses a one-wire TTL data line, but the ESP32 cannot safely accept 5 V signals. Because of this, we selected the SN74LVC1G126DBVR as a 3.3 V-compatible buffer/interface device. This part acts as a middle layer between the ESP32 and the servo data line so that communication can occur more safely.

We also identified that the receive path from the servo back to the ESP32 still needed protection. Since the servo data signal may be around 5 V and the ESP32 input is limited to 3.3 V, a voltage divider or other protected input stage would be needed for the signal coming back from the servo.


-Servo motor needs 7.4V, we use a buck converter to step it down to 3.3V for ESP32
-The SN74LVC1G126DBVR is a ttl converter works at 3.3 bc other ttl converter only worked at 5V
- The TTL converter is the middleman between the ESP32 and the smart servo DATA line so they can communicate safely on one wire.
- We still need a safe receive path from the servo back to the ESP32, which we can use a voltage Divider circuit for
-SERVO data can be around 5V but ESP32 can only accept 3.3


<img width="326" height="229" alt="Screen Shot 2026-05-07 at 9 33 02 AM" src="https://github.com/user-attachments/assets/7a728d81-73f6-438d-bf44-ad796ea8253e" />


# Week of March 16, 2026 - PCB Design, Routing, and Board Preparation

This week, we focused on the PCB design work for the front panel PCB and the power and actuation PCB. The power and actuation PCB was designed to handle power distribution for the actuation subsystem and provide the electrical interface between the main PCB and the smart servos.

For the front panel PCB, I worked on the initial design and routing for the user-facing controls and indicators. This included planning the electrical connections for buttons, LEDs, and connector headers. I also worked through DRC issues and PCB audit checks so that the boards could move closer to ordering.

This week helped turn the project from a conceptual design into physical board layouts that could eventually be manufactured and assembled.


Here is the front panel PCB:
<img width="523" height="408" alt="Screen Shot 2026-05-07 at 9 37 44 AM" src="https://github.com/user-attachments/assets/cf19c88c-8378-42d2-8ea7-f23e396bae01" />



# Week of March 23, 2026 - Three-PCB System Architecture and Physical Design Planning
This week, we decided to split the system into three separate PCBs: the front panel PCB, the power and actuation PCB, and the main PCB. The front panel PCB would contain user-facing controls and indicators. The power and actuation PCB would handle the battery input, voltage regulation, servo power, and servo connections. The main PCB would contain the ESP32 and support sensing, control logic, and communication.

Our goal for the week was to finish the PCB designs and prepare them for ordering. We also planned to continue working on the breadboard demo and begin the physical design portion of the project. This included thinking about the vest structure, 3D-printed components, spool design, wiring layout, and how the electronics would be mounted on the vest.

A major focus was making sure the separate boards could still function together as one integrated wearable system. This meant thinking about how power, data, sensor signals, and physical wiring would move between different parts of the vest.

- here is the Power & Actuation PCB which we are currently working on:
- <img width="715" height="624" alt="Screen Shot 2026-03-23 at 10 26 30 AM" src="https://github.com/user-attachments/assets/20c94d9e-9542-4ffc-9b94-0f12f2c7f7ff" />

-here is the schematic:
<img width="904" height="507" alt="Screen Shot 2026-05-07 at 9 49 44 AM" src="https://github.com/user-attachments/assets/a3d6305a-5dc0-4f73-830a-89e1d3d734cb" />



# Week of March 30, 2026 - Individual Progress Report and Verification Planning

This week, I completed my individual progress report and organized the work I had completed so far. I documented my contributions to the front panel PCB, power and actuation PCB, sensing and calibration design, physical integration planning, and verification planning.

For verification, I outlined several remaining tests. One test is the voltage regulator verification, where the regulator output should be measured at the ESP32 VCC pin and sensor power rail to confirm that it remains within the required 3.0 V to 3.5 V range. Another test is the battery and motor timing verification, where the battery voltage should remain above 6.0 V while the motors apply corrective tension.

I also planned a stretch sensor stability test. In this test, the user maintains upright posture for 5 minutes while ADC values are logged through the Serial Monitor. The sensor reading should not drift by more than 10%. This will help verify that the conductive rubber cord is stable enough for posture detection.

Finally, I planned a Bluetooth/app mode verification test. The app should allow the user to switch between Active Correction Mode and Brace Mode. The ESP32 should acknowledge the mode change through serial output within 500 ms. In Active Correction Mode, slouching for less than 30 seconds should not activate the motors, while slouching for more than 30 seconds should activate the motors. In Brace Mode, the motors should move to a predefined tension level immediately.


<img width="430" height="437" alt="Screen Shot 2026-05-07 at 9 41 48 AM" src="https://github.com/user-attachments/assets/9e8445f9-a35f-4209-b2ba-b2a77294d0df" />



# Week of April 6, 2026  - Soldering and Breadboard Demo Update

Breadboard Demo:

Today, we made good progress on the breadboard demo and overall system integration. We successfully demonstrated three key subsystems: actuation, sensing, and wireless/Bluetooth communication. We also finalized the vest design and were able to demonstrate the difference between slouched posture and correct posture on a human body.


<img width="488" height="306" alt="Screen Shot 2026-05-07 at 9 46 32 AM" src="https://github.com/user-attachments/assets/cecc6cb3-425e-4901-9778-dac22b44fccc" />


Soldering:

For PCB assembly, I am currently working on soldering all of the boards. So far, I have soldered all resistors and capacitors, while the remaining components are still pending arrival. After soldering, I verified component values using the multimeter by checking both resistance and capacitance. For capacitance measurements, the multimeter can be switched to the capacitance setting by using the Shift and Frequency functions.


Heat Gun Instructions:

For soldering smaller components with fine pads, we will likely need to use either the heat gun or the soldering oven. Frey showed us how to use the heat gun process.
1. the heat gun is heated to about 350°F. It is important to be careful and make sure no one is standing in front of it, since it becomes very hot.
2. Solder paste is then applied around the pads; it does not need to be extremely precise.
3.  After that, flux is added around the area to help prevent bridging.
4.  The heat gun is then used to melt the solder onto the pads, and the solder should settle into the correct locations because of the flux.
5.  The component can then be placed onto the pads, and the heat gun is used again to attach it fully.


Soldering Oven:
 
 We may also use the PCB oven for some components that are better suited for reflow soldering.

Instructions:  https://courses.grainger.illinois.edu/ece445/lab/Using%20the%20PCB%20Oven%20SP25.pdf

<img width="393" height="265" alt="Screen Shot 2026-05-07 at 9 47 10 AM" src="https://github.com/user-attachments/assets/4dd294ce-fae0-4cbe-8411-aab201f8b85e" />


# Week of April 13, 2026 - PCB Assembly, Continuity Testing, and Power Bring-Up

This week, I continued PCB assembly and began focusing more heavily on board bring-up. After soldering available components, I inspected the boards for solder bridges, incorrect orientation, missing joints, or visible connection issues. This was especially important for the power and actuation PCB because it carries both the servo supply rail and the regulated 3.3 V rail for the ESP32 and sensing logic.

Here is the fully soldered Power & Actuation PCB:
<img width="467" height="430" alt="Screen Shot 2026-05-07 at 9 51 45 AM" src="https://github.com/user-attachments/assets/6afc8286-f43c-4e52-8853-1ce9f63117f1" />



I used a multimeter to perform continuity checks before applying power. These checks helped confirm whether important nets were electrically connected and whether there were any shorts between power and ground. During continuity testing, a beep indicated that two points were electrically connected. This was useful for checking the 7.4 V input path, ground connections, regulator output path, connector pins, and important control signals.

I also worked on voltage testing for the front panel and power-related boards. The main goal was to confirm that the 3.3 V rail was present and stable where expected. This rail is critical because it powers the ESP32 and sensor circuitry. A missing or unstable 3.3 V output would prevent the microcontroller from running and could make the sensing subsystem unreliable.

During this stage, we also continued thinking about how the emergency stop/kill switch should behave. Our earlier design considered cutting power directly, but as the system became more integrated, we recognized that it was safer for the controller to command the motors to release tension before the system fully stopped. This influenced the later decision to implement the kill switch through the control subsystem instead of only cutting power in the actuation subsystem.

Here was part of our intial testing setup with fornt panel connected:
<img width="506" height="324" alt="Screen Shot 2026-05-07 at 9 51 23 AM" src="https://github.com/user-attachments/assets/c0d32c1a-db28-4dd8-8973-bb8aafec8348" />

# Week of April 20, 2026 - Final Vest Integration and Physical Design Changes

This week, we moved further from subsystem testing toward full physical integration on the vest. One of the biggest lessons from this stage was that the physical design strongly affected whether the electrical and sensing systems worked correctly. Even if the electronics were functioning, the vest still needed the right sensor placement, strap routing, spool design, and board placement to create reliable posture correction.

We made several important physical design changes. First, we moved the front panel with the kill switch and status LEDs toward the lower front of the vest so that it would be easier for the user to reach and simpler to wire. Second, we changed the actuation material from elastic to ribbon. The elastic stretched too much and did not transfer enough corrective force to the user’s shoulders. Ribbon worked better because it reeled onto the spools more consistently and pulled the shoulder straps with less unwanted stretching.

We also changed the stretch sensor placement. Originally, we considered placing sensors along the cabling or straps, but that location did not produce reliable posture readings. The final design used one conductive rubber stretch cord placed straight down the middle of the user’s back. This placement created a clearer difference between upright posture and slouching because the cord stretched more directly with back curvature.

Another physical design change was the spool fabrication method. We initially considered 3D printing the spools, but later moved toward machined spool iterations because they were easier to adjust during testing and produced a more reliable winding surface for the ribbon.

By the end of this week, the vest design was much closer to the final implementation. The project was also calibrated around one user for this stage of development because fit, strap length, sensor placement, and servo movement amount all strongly depended on the user’s body and posture.

<img width="419" height="412" alt="Screen Shot 2026-05-07 at 9 54 52 AM" src="https://github.com/user-attachments/assets/c1b0671f-21b5-4cb2-9598-fccb94bbbd08" />
<img width="540" height="410" alt="Screen Shot 2026-05-07 at 9 54 31 AM" src="https://github.com/user-attachments/assets/4b69bd09-f847-4d25-a913-cef6343ae494" />

# Week of April 27, 2026 - Control Logic, Servo Calibration, BLE App Testing, and Full-System Verification

This week, we focused on making the full system behave correctly in both software and hardware. The control code handled posture detection, smoothing, the 30-second slouch delay, motor actuation, motor release, and kill switch behavior.

During testing, we found that using the raw voltage values was not as useful for slouch detection because the voltage only changed over a small range. Instead, the ADC readings provided a clearer and more practical signal for posture classification. Because of this, the final implementation used the ADC value directly to set posture thresholds instead of converting every reading into resistance and tension.

To make the posture state more stable, we added a smoothing algorithm to reduce the effect of sudden dips or spikes in the stretch sensor data. The smoothed value was calculated using: Snew = 0.15(ADCraw) + 0.85(Sprev)


This allowed each new sensor reading to influence the output while still giving most of the weight to the previous smoothed value. This made the system less likely to falsely detect a slouch from brief noise or small natural movements.

We also verified the 30-second delay logic. In Active Mode, the user can move naturally while the straps remain loose. If the user slouches for less than 30 seconds, the system should not actuate. If the user maintains a slouched posture for more than 30 seconds, the ESP32 commands the servos to reel in the straps. After the user returns to good posture and maintains it for 10 seconds, the motors reverse and release tension.


<img width="296" height="535" alt="Screen Shot 2026-05-07 at 9 58 43 AM" src="https://github.com/user-attachments/assets/7fbbf61c-3b9b-4208-9002-34d15ca4d101" />



Servo calibration was another major part of this week. We first tested the servo motors independently with the FE-URT-1 controller, then moved to software control through the ESP32. We assigned different IDs to the servos so that each motor could be commanded separately. The motors needed to move in opposite directions so the left and right straps would reel in at the same time. Through repeated testing, we found that a move amount of approximately 2800 worked well for the calibrated user. In the final code, the reel-in target was Servo 1: +2800 and Servo 2: -2800, while the release direction was Servo 1: -2800 and Servo 2: +2800.

We also worked on Bluetooth and app testing. First, we used nRF Connect to confirm that the ESP32 could advertise itself as APCV and connect over BLE. After confirming the BLE server worked, we moved to our custom Android app built using React Native and Expo. The app allowed the user to scan for APCV, connect to the vest, view live data, see the current posture state, view the current mode, see whether the kill switch was active, and adjust the motor move amount.

Finally, we implemented and tested the kill button behavior. The kill button was placed on the front panel and connected to the ESP32. It uses a latched kill state, so pressing the button toggles kill mode on or off. We also included a debounce delay so that one physical press would not be counted multiple times. In kill mode, if the motors were actuated, the system commanded them to unspool so the vest returned to a loose state.

<img width="540" height="515" alt="Screen Shot 2026-05-07 at 9 58 22 AM" src="https://github.com/user-attachments/assets/915423a3-2352-4428-bf11-e70af9a5a819" />


# Week of May 4, 2026 - Final Implementation, Final Report, and Demo Preparation

This week, we finalized the project and documented the completed implementation in the final report. The final Active Postural Correction Vest uses one conductive rubber stretch sensor along the middle of the user’s back, an ESP32 controller, two FeeTech STS3215 servo motors, ribbon-based cross-back straps, a front-panel kill switch, and a Bluetooth mobile app.

The final system has two main operating modes: Active Mode and Brace Mode. In Active Mode, the vest begins in a loose state so that the user can move naturally. If the user maintains a slouched posture for 30 seconds, the servo motors actuate and reel in the ribbon straps to guide the user back to upright posture. After the user holds good posture for 10 seconds, the motors reverse and release the tension. This supports the main goal of the project, which is to assist posture correction without forcing the user to rely on constant passive bracing.

In Brace Mode, the motors immediately reel in the straps to the calibrated good-posture position and hold that position until the mode is turned off or the kill switch is pressed. This mode was included for users who may need more continuous support or who want to learn what the correct posture position feels like before switching to Active Mode.

<img width="627" height="573" alt="Screen Shot 2026-05-07 at 10 02 26 AM" src="https://github.com/user-attachments/assets/373998a5-5053-44bf-a769-52242e1df351" />


We also finalized the safety behavior. The front panel kill switch was implemented through the control subsystem instead of only disconnecting power. This allowed the ESP32 to command the motors to release tension before stopping normal operation. This was safer and more practical because the user could remove the vest more easily if the straps were already tightened.

For verification, we checked the major system requirements. The system was tested for active posture correction, 30-second sustained slouch detection, 10-second good-posture release behavior, BLE app connection, app live data display, mode switching, and kill switch behavior. Due to battery-related issues, the final verification used a lab DC power supply instead of the 7.4 V battery pack. This allowed the actuation and control behavior to still be tested safely and consistently.

The final report also documented the main design changes from the original proposal. These included using ribbon instead of elastic for the actuation straps, moving the stretch sensor to the middle of the user’s back, moving the front panel to the lower front of the vest, using a buck converter for 3.3 V regulation, implementing software-based kill behavior, and using ADC readings directly for threshold-based posture classification.

Overall, the final implementation successfully demonstrated the core concept of an active posture-correction vest. The system detected sustained slouching, actuated motors to provide corrective tension, released tension after the user returned to good posture, provided a reachable kill switch, and displayed live posture data through a Bluetooth app.

<img width="1052" height="539" alt="Screen Shot 2026-05-07 at 10 01 16 AM" src="https://github.com/user-attachments/assets/ced9391f-ac6c-4616-b4dd-cfca0bb4368d" />




