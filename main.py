def on_button_pressed_a():
    robotbit.servo(robotbit.Servos.S1, 90)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_received_value(name, value):
    if go == 1:
        if name == "E" and value == 1:
            robotbit.motor_run(robotbit.Motors.M2B, 255)
        elif name == "F" and value == 1:
            robotbit.servo(robotbit.Servos.S1, -90)
        elif name == "C" and value == 1:
            robotbit.motor_run(robotbit.Motors.M2B, -255)
        elif name == "D" and value == 1:
            robotbit.servo(robotbit.Servos.S1, 90)
        if name == "X" and value > 1:
            robotbit.servo(robotbit.Servos.S1, 90)
        if name == "X" and value < 1:
            robotbit.servo(robotbit.Servos.S1, -90)
        if name == "Y" and value > 1:
            robotbit.motor_run(robotbit.Motors.M2B, 255)
        if name == "Y" and value < 1:
            robotbit.motor_run(robotbit.Motors.M2B, -255)
    else:
        robotbit.motor_run(robotbit.Motors.M2B, 0)
radio.on_received_value(on_received_value)

go = 0
radio.set_group(7)
strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
strip.set_brightness(25)
strip.show()
strip.show_rainbow(1, 220)
go = 0

def on_forever():
    global go
    strip.shift(5)
    if sonar.ping(DigitalPin.P0, DigitalPin.P0, PingUnit.CENTIMETERS) >= 15:
        go = 1
    if sonar.ping(DigitalPin.P0, DigitalPin.P0, PingUnit.CENTIMETERS) < 15:
        go = 0
basic.forever(on_forever)
