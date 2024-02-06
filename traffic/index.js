const colors = ["red", "yellow", "lime"];
const lights = document.querySelectorAll(".light");
let index = 0;

function turnAllLightsOff() {
    lights.forEach(function (light) {
        light.computedStyleMap.background = "black";
    });
}

function nextLight() {
    turnAllLightsOff();

    lights[2 - index].style.background = colors[2 - index];
}

setInterval(nextLight, 1000)