


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





