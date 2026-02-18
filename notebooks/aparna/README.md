# Aparna Worklog

My personal lab notebook (ideas, meeting notes, sketches, etc.)

# 2026-01-28 - Group Meeting about ideas

We used this time to go into depth to another idea after meeting with a TA today in office hours (yuleis2@illinois.edu). We reviewed the automatic shut-off, ROM detector for physical therapy, and the study space sensor. We deteremined that none of the ideas had enough hardware to make it a solid project.  

**New idea: Back Health Posture Aid**   
**Key Elements:** 
- Elastic bands that correct posture, is not a crutch but a reminder (doesn't just fix your posture but instead encourages you to maintain  
the back muscles)
- Pressure sensors that detect slouching vs. not slouching.  
Rough Sketch:  
<img width="1077" height="506" alt="image" src="https://github.com/user-attachments/assets/a73f591a-1e15-49a7-bd77-36050f4e8f9d" />

# 2026-02-10 - Proposal Document Draft Meeting + First TA Meeting
**Objectives:**
- Complete first TA meeting: ask for feedback on high-level requirements and block diagram, schedule weekly recurring meetings, and set up form of communication
- Complete first draft of the ethics, safety, and societal impact portion of proposal
- Complete portions of the introduction including high-level requirements and visual aid

We started drafting the first project proposal document that is due on Friday. We wrote up three high-level requirements before the TA meeting. 
We also made a first draft of the block diagram that included details of the subsystem requirements. Things to complete in the group meeting to day include parts of the introduction, and the paragraph about ethics and safety. What I will be completing today is the first draft of the ethics and safety paragraph. Below is my first draft of the block diagram to include in the proposal.  

Link to project proposal document: https://uillinoisedu-my.sharepoint.com/:w:/g/personal/jandr25_illinois_edu/IQC-NcK1GkeVRaKIV_w5DiLCAYXUlPycsM8tLV9G8-nHWU0?e=AIFghi   

  
  

**Block Diagram**
<img width="1907" height="1152" alt="image" src="https://github.com/user-attachments/assets/4219c4eb-c747-492d-9531-3996f5ef7437" />


**TA Meeting**
- Scheduled weekly meeting times: 10AM on Mondays
- Made discord group chat for commuincation
- Got feedback on the high-level requirements: need to quantify some of the values stated (e.g. how long it takes to return to the calibrated upright position and how long it takes to release the tension after reaching proper posture)
- Feedback on block diagram: Make a lot more specific, include things like UART vs. SPI, also include how each subsystem interfaces with one another

**Tasks completed**
- TA meeting: meetings scheduled, feedback received
- Ethics section first draft
- Introduction first draft 

# 2026-02-13 - Proposal Document Final Draft Meeting

**Objectives**
- Complete the block diagram
- Select motors, microcontrollers, and sensors
- Complete the rest of section two in proposal
- Review sections one and three of the proposal

Below is a table I created to determine which motors to go with for our project.  

| Feature | [Waveshare SC15](https://www.waveshare.com/sc15-servo.htm) | [FeeTech STS3215](https://www.amazon.com/RCmall-Continuous-Rotation-SO-ARM100-Programming/dp/B0F87Z9M3P?th=1) | [DYNAMIXEL XL430-W250-T](https://robotis.us/dynamixel-xl430-w250-t/) | Recommendation | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Max Stall Torque** | 17 kg·cm (8.4V) | 30 kg·cm (12V) | 15.3 kg·cm (12V) | FeeTech | FeeTech has the highest raw power. |
| **8kg Load Suitability** | Risky (Near 100% capacity) | Safe (26% capacity) | Capable (Near 50% capacity) | FeeTech | FeeTech is highly durable for this specific load. |
| **Best Feedback Metrics** | Position, Load, Speed, Voltage | Current, Load, Position, Speed, Temp | Position, Velocity, PWM, Temp. | FeeTech | Provides current and temperature monitoring. |
| **Rotation Mechanism** | 180° Servo / 360° Motor | 360° Magnetic Encoder | 360° Contactless Encoder | DYNAMIXEL | Uses the most advanced encoder type. |
| **Gear Material** | High-precision Metal | Steel | Engineering Plastic | FeeTech/Waveshare | Metal/Steel gears generally offer better durability. |
| **Approx. Price** | $18.00 | $21.00 – $28.00 | $27.50 – $45.00 | Waveshare | Most budget-friendly option. |

We decided to go with the FeeTech STS3215 motors as they were the most affordable, posseses ample power, and are very safe.   

STRETCH SENSORS: 
https://www.adafruit.com/product/6379?gad_source=1&gad_campaignid=21079227318&gbraid=0AAAAADx9JvRWYU5tJsMEXvWKXJLSAmWvC&gclid=CjwKCAiAtLvMBhB_EiwA1u6_Pnn6ahT9QPF7mxnxF1kEBRIVxbh8-vFY-_DceWhQ5l1bP-qh_47wfBoCBFIQAvD_BwE

**Tasks completed**
- Completed the block diagram
- Selected motors, microcontrollers, and sensors
- Completed the rest of section two in proposal
- Reviewed sections one and three of the proposal
- Submitted the proposal document

# 2026-02-17 - PCB schematic initial meeting

**Objectives**
- Complete the team contract
- Go through supply catalog to determine what we can use
- Message Frey about the parts we want to order asap (motors, stretch sensors, microcontroller)
- Watch videos on good PCB design layout
- Determine what components we need to add to our PCB 

**Tasks Completed**
- Completed the team contract
- Went through the [supply catalog](https://docs.google.com/spreadsheets/d/1InSHH3_mebTMyk4SWF0S2R67ZWSWq7FpKZRyKWeDHm0/edit?gid=1780582164#gid=1780582164) and determined we can use:
- LM3940IT-3.3V Regulator
- 10 uF and 0.1 uF capacitors 
- 6mm tactile switches
- 10kOhm resistors
- MTA-100 Headers (6-pin)
- 22 AWG Stranded Wire
- Messaged our TA about which microcontroller to use
- In progress: watch videos on PCB design, determining what components we need to add to our PCB, message TA about parts we need to order 



