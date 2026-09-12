canvasColorPicker.width = 250;
canvasColorPicker.height = 250;
canvasColorPicker.style.left = "10%"
canvasColorPicker.style.top = "10%";
canvasColorPicker.style.border = "1px solid black";

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

    const hueGradient = ctx.createLinearGradient(0,0,250,0);
    const blackToWhiteGradient = ctx.createLinearGradient(0,0,0,250);

    hueGradient.addColorStop(0, "white");
    hueGradient.addColorStop(1, `rgb(${hueColor[0]}, ${hueColor[1]}, ${hueColor[2]})`);

    ctxColorPicker.fillStyle = hueGradient;
    ctxColorPicker.fillRect(0,0,250,250)

    blackToWhiteGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    blackToWhiteGradient.addColorStop(1, "rgba(0, 0, 0, 1)");

    ctxColorPicker.fillStyle = blackToWhiteGradient;
    ctxColorPicker.fillRect(0,0,250,250)
}

function updateRGB(r,g,b){
    redValue.value = r;
    greenValue.value = g;
    blueValue.value = b;

    colorPreview.style.backgroundColor = rgbToHex(r,g,b);
}

function clickDetection(){
    let saturation = colorClickX / 250;
    let darkness = colorClickY / 250;
    let hue = Number(hueSlider.value);
    let hueColor = hueToRGB(hue);
    r = redValue.value
    g = greenValue.value
    b = blueValue.value
    r = 255 + (hueColor[0] - 255) * saturation;
    g = 255 + (hueColor[1] - 255) * saturation;
    b = 255 + (hueColor[2] - 255) * saturation;
    r = r * (1 - darkness);
    g = g * (1 - darkness);
    b = b * (1 - darkness);
    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);
    updateRGB(r,g,b)
    colorPreview.style.backgroundColor = rgbToHex(r, g, b);
    confirmButton.addEventListener("click",() => {
        color = "#" + hexInput.value;
    })
}

drawColorPicker()