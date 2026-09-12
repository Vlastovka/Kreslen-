const canvasColorPicker = document.getElementById("colorPickerMain");
const ctxColorPicker = canvasColorPicker.getContext("2d");
const confirmButton = document.getElementById("confirmButton");

canvasColorPicker.width = 200;
canvasColorPicker.height = 200;

let colorClickX = 0; 
let colorClickY = 0;

const hueSlider = document.getElementById("hueSlider")
hueSlider.addEventListener("input", ()=> {
    drawColorPicker();
})

function hueToRGB(h){
    const c = 1
    const x = 1 - Math.abs((h/60)%2-1);

    let r,g,b;

    if(h < 60){
        r = c;
        g = x;
        b = 0;
    } else if (h < 120){
        r = x;
        g = c;
        b = 0;
    } else if (h < 180){
        r = 0;
        g = c;
        b = x;
    } else if(h < 240){
        r = 0;
        g = x;
        b = c;
    } else if(h < 300){
        r = x;
        g = 0;
        b = c;
    } else if(h <= 360){
        r = c;
        g = 0;
        b = x;
    }
    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255)
    ];
}

function drawColorPicker(){

    let hueColor = hueToRGB(Number(hueSlider.value));

    const hueGradient = ctx.createLinearGradient(0,0,200,0);
    const blackToWhiteGradient = ctx.createLinearGradient(0,0,0,200);

    hueGradient.addColorStop(0, "white");
    hueGradient.addColorStop(1, `rgb(${hueColor[0]}, ${hueColor[1]}, ${hueColor[2]})`);

    ctxColorPicker.fillStyle = hueGradient;
    ctxColorPicker.fillRect(0,0,200,200)

    blackToWhiteGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    blackToWhiteGradient.addColorStop(1, "rgba(0, 0, 0, 1)");

    ctxColorPicker.fillStyle = blackToWhiteGradient;
    ctxColorPicker.fillRect(0,0,200,200)
}

canvasColorPicker.addEventListener("click", (e) => {
    colorClickX = e.offsetX;
    colorClickY = e.offsetY;
    clickDetection();
})

function clickDetection(){
    let saturation = colorClickX / 200;
    let darkness = colorClickY / 200;
    let hue = Number(hueSlider.value);
    let hueColor = hueToRGB(hue);
    let r = 255 + (hueColor[0] - 255) * saturation;
    let g = 255 + (hueColor[1] - 255) * saturation;
    let b = 255 + (hueColor[2] - 255) * saturation;
    r = r * (1 - darkness);
    g = g * (1 - darkness);
    b = b * (1 - darkness);
    r = Math.floor(r)
    g = Math.floor(g)
    b = Math.floor(b)
    confirmButton.addEventListener("click",() => {
        color = rgbToHex(r, g, b)
    })
}

function rgbToHex(r, g, b) {
    return "#" + [r, g, b]
        .map(value => value.toString(16).padStart(2, "0"))
        .join("");
}