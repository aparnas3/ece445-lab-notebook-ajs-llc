


# Sophia Sulkar Worklog

My personal lab notebook (ideas, meeting notes, sketches, etc.)

# 2026-01-28 - Initial Posture Corrector Idea Notes


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


# 2026-02-10 - Starting Proposal and meeting with TA

We met with our TA today and he gave us some feedback on our idea as well as our block diagram. Today I will be working on the visual aid for the project. Here is a picture of our tentative block diagram. Our goals for today is to finish bullet points 1 and 3 of our proposal.

**Tentative block diagram**

![1000000875](https://github.com/user-attachments/assets/0bed5b8a-3fd3-41d2-b9f9-e7bb7fcce6c0)

# 2026-02-13 - Materials Table/Prices

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

# 2026-02-17 - Meeting Goals
-Finish Team Contract

-Send parts we want ordered to Frey

-Research good PCB design practices

-Start our design in KiCad (aka figure out what parts we want on our PCB)


KiCad Schematic Notes:

Actuation & Power:
-- 2S 18650 battery pack (7.4V) as main source rail (label it VBAT_7V4)
-- split into two branches
    Motor rail: VBAT_7V4 → E-STOP → VMOTOR_7V4 (proposal says the kill switch is on the motor power path)
    Logic rail: VBAT_7V4 → Voltage Regulator → +3V3 (proposal says regulator makes stable 3.3V for ESP32 + sensors)


Control:
-- Power: +3V3 and GND to the ESP32
-- ADC inputs: at least one pin labeled like STRETCH1_ADC (proposal: ESP32 reads stretch sensor voltages through ADC)


# 2026-02-26 - TA Meeting Suggestions

- Fix high-level requirements
- Fix tolerance analysis units
- Create test points
- Define how much of a slouch it can detect (percentage difference from ideal)
- Add Schematic for each subsytem (DESIGN DOC)
- How to convert ADC reading to tension reading

# 2026-03-9 - Breadboard Demo Notes
-Servo motor needs 7.4V, we use a buck converter to step it down to 3.3V for ESP32
-The SN74LVC1G126DBVR is a ttl converter works at 3.3 bc other ttl converter only worked at 5V
- The TTL converter is the middleman between the ESP32 and the smart servo DATA line so they can communicate safely on one wire.
- We still need a safe receive path from the servo back to the ESP32, which we can use a voltage Divider circuit for
-SERVO data can be around 5V but ESP32 can only accept 3.3


# 2026-03-23 - Update
- So we decided to split up our system into 3 PCBs: one for the front panel, one for the power&actuation system, and one for the rest fo the system
- Our goal is to get all 3 ordered by today or tommorrow
- The rest of the week we will be working on our breadboard demo
- next week our goal is to start the physical deisgn portion, 3d printing and actual vest design
- here is the PCB we are currently working on:
- <img width="715" height="624" alt="Screen Shot 2026-03-23 at 10 26 30 AM" src="https://github.com/user-attachments/assets/20c94d9e-9542-4ffc-9b94-0f12f2c7f7ff" />


# 2026-04-7 - Soldering and Breadboard Demo Update


Breadboard Demo:

Today, we made good progress on the breadboard demo and overall system integration. We successfully demonstrated three key subsystems: actuation, sensing, and wireless/Bluetooth communication. We also finalized the vest design and were able to demonstrate the difference between slouched posture and correct posture on a human body.


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
