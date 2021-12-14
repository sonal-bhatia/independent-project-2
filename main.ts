input.onButtonPressed(Button.A, function () {
    robotbit.Servo(robotbit.Servos.S1, 90)
})
radio.onReceivedValue(function (name, value) {
    if (name == "A" && value == 1) {
        robotbit.MotorRun(robotbit.Motors.M2B, 255)
    } else if (name == "B" && value == 1) {
        robotbit.MotorRun(robotbit.Motors.M2B, -255)
    }
    if (go == 1) {
        if (name == "E" && value == 1) {
            robotbit.MotorRun(robotbit.Motors.M2B, 255)
        } else if (name == "F" && value == 1) {
            robotbit.Servo(robotbit.Servos.S1, -90)
        } else if (name == "C" && value == 1) {
            robotbit.MotorRun(robotbit.Motors.M2B, -255)
        } else if (name == "D" && value == 1) {
            robotbit.Servo(robotbit.Servos.S1, 90)
        }
        if (name == "X" && value == 0) {
            robotbit.Servo(robotbit.Servos.S1, 90)
        } else if (name == "X" && value > 0) {
            robotbit.Servo(robotbit.Servos.S1, Math.map(value, 0, 50, 90, 100))
        } else if (name == "X" && value < 0) {
            robotbit.Servo(robotbit.Servos.S1, Math.map(value, -50, 0, 80, 90))
        }
        if (name == "Y" && value == 0) {
            robotbit.MotorRun(robotbit.Motors.M2B, 0)
        } else if (name == "Y" && value > 0) {
            robotbit.MotorRun(robotbit.Motors.M2B, Math.map(value, 0, 50, 0, 255))
        } else if (name == "Y" && value < 0) {
            robotbit.MotorRun(robotbit.Motors.M2B, Math.map(value, 0, -50, 0, -255))
        }
    } else {
        robotbit.MotorRun(robotbit.Motors.M2B, 0)
    }
})
let go = 0
radio.setGroup(7)
let strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
strip.setBrightness(25)
strip.show()
strip.showRainbow(1, 220)
go = 0
basic.forever(function () {
    strip.shift(5)
    if (sonar.ping(
    DigitalPin.P1,
    DigitalPin.P0,
    PingUnit.Centimeters
    ) >= 15) {
        go = 1
    }
    if (sonar.ping(
    DigitalPin.P1,
    DigitalPin.P0,
    PingUnit.Centimeters
    ) < 15) {
        go = 0
    }
})
