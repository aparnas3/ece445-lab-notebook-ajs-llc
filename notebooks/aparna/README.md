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
-
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
-
- TA meeting: meetings scheduled, feedback received
- Ethics section first draft
- Introduction first draft 

# 2026-02-13 - Proposal Document Final Draft Meeting

**Objectives**
-
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
-
- Completed the block diagram
- Selected motors, microcontrollers, and sensors
- Completed the rest of section two in proposal
- Reviewed sections one and three of the proposal
- Submitted the proposal document

# 2026-02-17 - PCB schematic initial meeting

**Objectives**
-
- Complete the team contract
- Go through supply catalog to determine what we can use
- Message Frey about the parts we want to order asap (motors, stretch sensors, microcontroller)
- Watch videos on good PCB design layout
- Determine what components we need to add to our PCB 

**Tasks Completed**
-
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

# 2026-02-20 - Rough Draft of PCB Board Design and Schematic

**Objectives**
-
- Finish the PCB schematic
- Finish the PCB board layout

<div align="center">
PCB Schematic 1st Rough Draft
</div>


  
<img width="1360" height="672" alt="image" src="https://github.com/user-attachments/assets/a26c5f87-2f2b-47dc-8ee2-d340d6e00172" />


**Tasks Completed**
-
- Finished the rough draft of the PCB schematic 

# 2026-02-23 - Weekly TA meeting 

We discussed our proposal document and our PCB schematic, and got feedback on both. It was recommmended to us that we use a breadboard to verify that our schematic works the way we intend.  
Here are a list of things he suggested for our proposal:
- edit high level requirements (1st and 2nd are too similar)
- define problem more clearly
- force units measurement are not correct- should have newtons in the measurement?
We also checked out the ESP32 dev board for testing on breadboard which will start completing in the next week or so.


# 2026-02-27 - Group Meeting

**Objectives** 
-
- Figure out the BMS system
- Determine the power source setup for the board 
- Finish Design document (schematics and block diagram)


We decided to split up the design document in these main sections, in which I did the majority of the electrical diagrams and the block diagram, as well as the ethics section
This is a figure that my team member jordyn made:
<img width="788" height="899" alt="image" src="https://github.com/user-attachments/assets/de6c2203-dcf2-40fa-930e-981d7162ab09" />
<br>
<br>
<br>
<br>
This is the block diagram I ended up creating for the design document as well:

<img width="1022" height="925" alt="image" src="https://github.com/user-attachments/assets/9a2b9de6-d480-4f5b-89c4-376860824334" />


<br>
<br>
<br>
<br>
And these are the schematics I created in KiCad for each of our subsystems for the beginning of our PCB design as well as the design document.
<br>
<br>

<img width="975" height="424" alt="image" src="https://github.com/user-attachments/assets/794dd90e-957c-4b86-94a2-167c3a36f796" />
<img width="975" height="433" alt="image" src="https://github.com/user-attachments/assets/e97a1db9-8a00-4acf-8d8a-55c7b6221cad" />
<img width="975" height="526" alt="image" src="https://github.com/user-attachments/assets/fa030aa8-13e3-4995-b820-184ae161c8ad" />
<img width="975" height="423" alt="image" src="https://github.com/user-attachments/assets/78d9047a-037f-42d2-8e66-7476084ff076" />


We ended up going for a [2S 8.4V 10A Li-ion ProtectionBoard](https://www.amazon.com/DIANN-Lithium-Battery-Protection-Charger/dp/B0B4D1G1C3/ref=sr_1_2?crid=3IDU2IEVLGE12&dib=eyJ2IjoiMSJ9.vIvJOG6s6fU0pED-B0Gb9ilnIEVpHjR8ggJ7bS9Xhrn_B_2jarhckzdXFndGE92pR14QZlZh1-kLFSKyjkPExfsbpGccvB7ptV9RoTT8G29W2VV1PM-8bkaPPtWw_XVVxO5EazdDAELoBNHtOO-8NYGj4ufNsosvufM0dsykEyO1lPLSR5lsfzSpOh7x5IwBD4QyhnEF3NahVCL5tsv-X5KVVwakcpwVx9ML7ASOvy8Wp9TZAs3xcFt9Nipdt_dtp-DlTVzFshNsbKRIdAEXkn8hLLD1HFpp-lZ_cPaxxdY.IyZQgrkeEtcrUBmktGxDxGBcEyfEBZNlH3P5gr48ZB0&dib_tag=se&keywords=2S+8.4V+10A+Li-ion+Protection+Board&qid=1772248326&s=electronics&sprefix=2s+8.4v+10a+li-ion+protection+board%2Celectronics%2C200&sr=1-2) due to the fact that using an external BMS will be more reliable and safe when using on an actual human user. We could attach our own BMS unit, however we don't want soldering or another issue to pose more of a risk to the user.

**Tasks Completed**
-
- Ordered the BMS chip that we need for our project (my own personal objective)
- Submitted the design document
- Completed the block diagrams and schematics 
- Completed the ethics section of the paper 

# 2026-03-06 - Group Meeting

**Objectives** 
-
- Revise the voltage regulation system 
- Figure out how to wire up the the stretch sensors on breadboard for pcb
- Revise half-duplex conversion system


This is the first draft of the schematic I came up with for our PCB, however we realize now that the 74LS176 or anything from the 74HC series will not work for our servo motors because of data direction issues and voltage issues, these chips are not compatible with our power system. 
<br>
<br>
<img width="1137" height="550" alt="image" src="https://github.com/user-attachments/assets/f8f0998f-980e-42b8-92dd-04035c5d987d" />
<br>
<br>
<br>
<br>
After discussing with a TA in lab and consulting an electrical engineering friend, we determined a buck regulator is better suited for our needs since the voltage sags less with a regulator. We ended up selecting this [buck regulator](https://www.digikey.com/en/products/detail/texas-instruments/TPS62162DSGR/2833447) 


In terms of our breadboard setup, I did some research into how we should wire up the conducitve rubber cord to read the sensor readings from the arduino IDE, and I came across this link [measuring stretch forces](https://www.hackster.io/Juliette/measuring-stretch-forces-with-a-conductive-rubber-cord-d1528e)


Then in terms of the half-duplex conversion system we were going to use, we chose this [bus buffer](https://www.ti.com/product/SN74LVC1G126/part-details/SN74LVC1G126DBVR) instead of the 74LS176 since this properly deals with direction and data voltage. We were able to find this through some research on the typical chips used with the FeeTech STS3215 motors we selected.

**Tasks Completed**
-
- Revised voltage regulation system
- Set up breadboard sensing setup
- Found a better bus buffer for half-duplex conversion

# 2026-03-11 - Schematic Meeting

**Objectives** 
-
- Complete schematic for Front Panel PCB
- Complete schematic for Main PCB

**Hardware Schematic Build Map**
-
This map that i made using data sheets and gemini to get a good grasp of how electrical connections work serves as a reference for the KiCad schematic and PCB layout for the vest, schematics are still in progress. I also created a connection for the Muscle/Motor PCB, and delegated the work of that to Jordyn.

## 1. Muscle PCB
| Category | Component | Connection | Purpose |
| :--- | :--- | :--- | :--- |
| **Power In** | **XT30PW** | (+) to VBAT, (-) to GND | Main battery entry |
| **Protection** | **Mini Blade Fuse** | In: VBAT, Out: VBAT_FUSED | Overcurrent protection |
| **Switching** | **TPS26630RGE** | IN: VBAT_FUSED, OUT: VSYS_SW | High-side power cut / eFuse |
| **Control** | **LTC2950CTS8-1** | PB: PWR_BTN, EN: TPS26630 EN | On/Off latching controller |
| **Logic Rail** | **TPS62162DSGT** | VIN: VSYS_SW, VOUT: 3V3 | 3.3V Buck for logic |
| **Servo Bus** | **74LVC1G126** | A: TX, Y: SERVO_DATA, OE: DIR | Tri-state half-duplex buffer |
| **Servo Header 1** | **3-Pin Header** | V+: VSYS_SW, GND, Data: SERVO_DATA | Motor 1 connector |
| **Servo Header 2** | **3-Pin Header** | V+: VSYS_SW, GND, Data: SERVO_DATA | Motor 2 connector |
| **Interconnect** | **BRAIN_LINK (6-pin)** | 3V3, GND, TX, RX, DIR, Spare | Connection to Brain PCB |

## 2. Brain PCB
| Category | Component | Connection | Purpose |
| :--- | :--- | :--- | :--- |
| **MCU** | **ESP32-C6-WROOM-1** | VDD: 3V3, GND: GND | Main Controller |
| **UART Bus** | **UART Pins** | TX: Pin 3, RX: Pin 4, DIR: Pin 5 | Servo communication logic |
| **Sensor 1** | **B2B-PH (2-pin)** | Pin 1: 3V3, Pin 2: ADC_CORD1 | Stretch sensor 1 input |
| **Sensor 2** | **B2B-PH (2-pin)** | Pin 1: 3V3, Pin 2: ADC_CORD2 | Stretch sensor 2 input |
| **Voltage Div** | **10k Resistors** | ADC_CORDx to GND | Pull-down for stretch sensors |
| **UI Interface** | **FRONT_UI (6-pin)** | 3V3, GND, LED1, LED2, BOOT, EN | Connection to Front Panel |

## 3. Front Panel
| Category | Component | Connection | Purpose |
| :--- | :--- | :--- | :--- |
| **Main Power** | **Momentary Button** | Between PWR_BTN and GND | Latching power toggle |
| **Boot Mode** | **Momentary Button** | Between BOOT_BTN and GND | Programming mode trigger |
| **Reset** | **Momentary Button** | Between EN_BTN and GND | Hard hardware reset |
| **Status LED** | **System LED** | 3V3 - Resistor - LED - GND | Visual "System Alive" indicator |
| **Cord LED 1** | **Indicator LED 1** | LED_CORD1 - Resistor - LED - GND | Sensor 1 feedback |
| **Cord LED 2** | **Indicator LED 2** | LED_CORD2 - Resistor - LED - GND | Sensor 2 feedback |


**Tasks Completed**
-
- Completed the connection map for the front panel, schematic still IP
- Completed the connection map for the main panel, schematic still IP

# 2026-03-12 - Schematic Meeting

**Objectives** 
-
- Complete schematic for Front Panel PCB
- Complete schematic for Main PCB
<br>

Note: i made the current footprints hand solder, we would need to change it for the baking solder. 

I added the front panel and main schematics and also already selected the footprints for the mian
for the front panel, so the goal is to get my partners to select LEDs and Buttons that are big enough and bright enough

Main PCB Schematic First Draft
<img width="1376" height="818" alt="image" src="https://github.com/user-attachments/assets/41bb9bb3-b644-454c-b406-0bc98a53f3d7" />
<br>

Front Panel Schematic First Draft
<img width="1145" height="806" alt="image" src="https://github.com/user-attachments/assets/3ad61809-5944-48bc-ae22-0cdea0770fbe" />
<br>

Front Panel PCB Design First Draft
<img width="847" height="886" alt="image" src="https://github.com/user-attachments/assets/d85dc633-2954-4e88-92fb-bd9de86214e6" />

**Remaining Tasks for first order of PCBs**
- PCB for main
- Footprints for front
- PCB for front
- Complete schematic for power?
- Footprints for power
- PCB for Power

**Tasks Completed**
-
- Completed schematic for Front Panel PCB
- Completed schematic for Main PCB


# 2026-03-23 - Figuring out batteries (also group meeting after break)
**Objectives** 
- 
- Weigh options for batteries 
- Order the correct battery for our project


This meeting I mainly did research on batteries, and what would be the most optimal to use for our vest.
Swapping out the battery plan today. The [GOLDBAT 5000mAh LiPo](https://www.amazon.com/GOLDBAT-5000mAh-Hardcase-Battery-Airplane/dp/B07QSF3LSS) is massive overkill and honestly a safety hazard for a wearable—don't need 50C discharge to move a couple of servos, and I'd rather not have a literal brick on the user's back. 

Moving to the [Blomiky 7.4V 600mAh Li-ion](https://a.co/d/0hM1jaxR) packs instead. They are way lighter and fit the form factor better. Only annoyance is the connector: it uses an SM-4P black 4-pin plug. I'm going to have to hack that off and solder on an XT30 to actually interface with the Motor PCB. 
If the voltage sags too hard when the servos stall, I'll just parallel two of them or find a bigger Li-ion later.

**Tasks Completed**
-
- Selected the potential proper battery (have not ordered yet)

# 2026-03-24 - Continuing PCB Design to order 

**Objectives** 
- 
- Complete the main PCB layout 

Spent most of today wrestling with the ESP32-C6 placement (U1). I moved it toward the top edge to make sure the antenna area is clear of any copper, do not want the ground plane killing the WiFi signal while we’re trying to stream posture data. I also noticed the 3V3 trace was looking a bit thin near R7, so I beefed up the copper width.

For the USB-C part (J3), I finally got the 5.1k resistors (R8/R9) placed so the board actually negotiates power correctly. I threw in some 0-ohm jumpers (R10/R11) on the data lines too, mostly as a "just in case" so I can hardware-isolate the USB if it starts interfering with the UART lines. The routing for the stretch sensor connectors (J2 and J5) is done.

I also double-checked the B6B-PH connectors (J1 and J4) to make sure they match the Muscle PCB pinout 1:1. It would be a total nightmare to have to cross-wire a custom cable harness because I flipped a header on the layout. Everything looks pretty clean now, just need to do a final pass on the ground pour.


<img width="910" height="657" alt="image" src="https://github.com/user-attachments/assets/13e0c246-7db4-4b12-885c-b1ed6bb6344c" />

**Next Steps**
- Need to run a full DRC to make sure I didn't leave any tiny slivers of copper near the USB pads. I also want to check the ground via stitching around the ESP32 thermal pad (Pin 29) to make sure the heat dissipation is solid before I order this one.

**Tasks Completed**
-
- Completed PCB design, waiting to order the full batch of PCBs

# 2026-03-30: Finalizing Parts and PCB Order
**Objectives** 
- 
- Order all the PCBs
- Order any extra parts that are needed to complete the vest  

Finally ordered the PCBs today. The shipping charge from the fab was $37.86 shipping for a $4.00 order.

Spent the rest of the day hunting down the last of the power components and figuring out the battery situation. We're looking at a [JUZUXI 3000mAh Li-ion pack](https://www.amazon.com/JUZUXI-Rechargeable-Batteries-Connector-Compatible/dp/B0DBZG1GLY) which has a much better capacity-to-weight ratio than the old LiPos. It comes with a Deans/T-Plug though, so I found some [Deans to XT30 adapters](https://www.amazon.com/Deans-T-Female-Connector-Adapter-Batteries/dp/B09NTG5XKL) to save us from having to resolder the battery leads directly. Also grabbed some [XT30 extension cables](https://www.amazon.com/OliRC-Adapter-Extension-Female-Battery/dp/B0B93VBCC8) just in case the Muscle PCB mounting position is too far from the battery pouch in the vest.

For the reservoir caps on the Motor PCB, Jordyn and I settled on a [1000uF Nichicon](https://www.digikey.com/en/products/detail/nichicon/UVR1C102MPD/588785). It's rated for 16V which gives us plenty of headroom for the 7.4V nominal bus, and it should stop the ESP32 from browning out when the servos spike. I also grabbed the [Wurth ceramic caps](https://www.digikey.com/en/products/detail/w-rth-elektronik/885012207014/5454651) for the high-frequency decoupling near the buck converter. 

Everything is officially in flight now. Once the boards get here, it's straight to the soldering station to see if this power tree actually holds up under load.

**Tasks Completed**
-
- Completed the PCB order 
- Ordered the extra parts on amazon
- Gave the extra digikey parts to Frey to order on our behalf

# 2026-04-06: Servo Control & BLE Integration Testing
**Objectives** 
- 
- Establish reliable half-duplex communication with the STS3215 servos
- Solve the missing component issues for the final PCB assembly

I realized the 5.1k ohm resistor packet was empty. I ordered some [Chanzon 100k SMD 0805 resistors](https://www.amazon.com/Chanzon-Resistor-Tolerance-Resistors-Certificated/dp/B08QS2WPNQ) to make sure we have everything we need for the pull-ups and dividers on the final board. It’s a minor setback, but we can’t finish the sensory logic without them. 

On the software side, I spent a few hours dialing in the half-duplex communication. I found a great [GitHub library by Matthieu Vigne](https://github.com/matthieuvigne/STS_servos) specifically for FeeTech STS servos. This was huge because it handles the little-endian byte conversion and torque register switching automatically, which is way better than us trying to hardcode raw hex packets. My testing procedure involved using an FE-URT-1 bridge to bridge the ESP32-C6 to the servos. I mapped the TX/RX to GPIO 16 and 17, and I had to be super careful to toggle the FE-URT-1 level switch to 3.3V so I didn't fry the ESP32. 

**Wiring:**
- ESP32 TX (GPIO17) → FE-URT-1 UART TX pin
- ESP32 RX (GPIO16) → FE-URT-1 UART RX pin
- ESP32 GND → FE-URT-1 GND
- Toggle the level switch on FE-URT-1 to 3.3V
- External power supply → FE-URT-1 power terminal
- FE-URT-1 SCS port → servo

The end of the day was spent merging this with the BLE stack. Jordyn ran into a frustrating "Failed to connect" error where the TX path seemed down on COM6, but we eventually got the code flashed. We successfully got the servo responding to pings while the BLE was active, so the next step is just cleaning up the timing.

**Tasks Completed**
-
- Sourced and ordered [100k SMD resistors](https://www.amazon.com/Chanzon-Resistor-Tolerance-Resistors-Certificated/dp/B08QS2WPNQ) for the sensory pull-up circuits
- Integrated the STS servo driver library and configured custom UART pins for the ESP32-C6
- Established a stable BLE server on the C6 for remote command handling
- Successfully executed position sweeps (0 to 4095) via the FE-URT-1 bridge and confirmed torque engagement

# 2026-04-13: Planning and Logistics Week

**Objectives** 
- 
- Finalize the assembly timeline for the Muscle and Brain PCBs.
- Coordinate between CAD spool design, app development, and hardware soldering.
- Order all remaining hardware for the vest integration.

<br>

I spent today sitting down and mapping out the entire week to make sure that we have a solid schedule. The biggest hurdle right now is soldering as we have three separate boards (Motor, Main/Brain, and Front Panel) and we need to transition from hand-soldering the small stuff to using the heat gun for the trickier SMD packages. 

What we ended up discussing as a group is as following: I’m taking over the revised PCB layout for the Main board and getting that order out and I need to handle the CAD for the spool design. Jordyn is going deep on the app interface, and Sophia is going to be doing the soldering. We also need to pivot to the "physical" side of the project—actually sewing the motors onto the vest and finding the right rings to anchor the stretch sensors. It's a lot of moving parts, but if we stick to this schedule, we should have a testable prototype by the weekend.

| Day | Aparna | Sophia | Jordyn |
| :--- | :--- | :--- | :--- |
| **Monday** | Order extra PCB components | Hand-solder initial board parts | Core App logic and BLE setup |
| **Tuesday** | Revise Main PCB & order; CAD setup | Heat gun soldering on Main PCB | App UI and basic testing |
| **Wednesday** | CAD spool design & first print | Heat gun work for all remaining PCBs | Finalize App functionality |
| **Thursday** | Print revised spools (if needed) | Finish all PCB soldering | Finalize full App interface |
| **Friday** | Finalize hardware logistics | Full testing of all PCBs | Sew motors & attach straps |

**Tasks Completed** 
- 
- Created clear path for the tasks that are left at hand
- Placed the order for some extra parts
- Sophia started the manual soldering for the initial component sets