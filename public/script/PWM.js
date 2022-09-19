var rpio = require("rpio");
rpio.init({mapping: "physical", gpiomem: false, close_on_exit: false});
const pin1 = 10;
const pin2 = 12;
const range = 1024;
const clockdiv = 8;

rpio.open(pin1, rpio.OUTPUT, rpio.LOW);

rpio.open(pin2, rpio.PWM);
rpio.pwmSetClockDivider(clockdiv);
rpio.pwmSetRange(pin2, range);

const setDataPWM = function(pin, data) {
    if(pin == 1) {
        rpio.pwmSetData(pin1, parseInt((1024 * data) / 100));
    } else if(pin == 2) {
        rpio.pwmSetData(pin2, parseInt((1024 * data) / 100));
    }
};
const writePWM = function (data) {
    if (data == "LOW") {
        rpio.write(pin1, rpio.LOW);
    } else if(data == "HIGH") {
        rpio.write(pin1, rpio.HIGH);   
    }
}

const SIGTERM = process.on('SIGTERM', function () {
    rpio.pwmSetData(pin2, 0);
    rpio.close(pin2, rpio.PIN_RESET);
    process.exit(0);
});

const SIGINT = process.on('SIGINT', function () {
    rpio.pwmSetData(pin2, 0);
    rpio.close(pin2, rpio.PIN_RESET);
    process.exit(0);
});

const salida = process.on('exit', function () {
    rpio.pwmSetData(pin2, 0);
    rpio.close(pin2, rpio.PIN_RESET);
    console.log('\nApagando, realizando limpieza GPIO');
    rpio.spiEnd();
    process.exit(0);
});

module.exports = {
    setDataPWM,
    writePWM,
    SIGINT,
    SIGTERM,
    salida
};