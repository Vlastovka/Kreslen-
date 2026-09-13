// Color picker
redValue.addEventListener("input", (e) => {
    r = Math.max(0, Math.min(255, Number(e.target.value))); updateRGB(r,g,b);
});
greenValue.addEventListener("input",(e) => {
    g = Math.max(0, Math.min(255, Number(e.target.value))); updateRGB(r,g,b);
});
blueValue.addEventListener("input", (e) => {
    b = Math.max(0, Math.min(255, Number(e.target.value))); updateRGB(r,g,b);
});

hexCode.addEventListener("input", (e) => {
    hexCode.value = e.target.value
    .replace(/[^0-9A-Fa-f]/g, "")
    .toUpperCase();
    if(hexCode.value.length === 6){
        let rgb = hexToRGB("#" + hexCode.value)
        r = rgb[0]
        g = rgb[1]
        b = rgb[2]
        updateRGB()
    }
});

canvasColorPicker.addEventListener("click", (e) => {
    colorClickX = e.offsetX;
    colorClickY = e.offsetY;
    mouseClickColor = true;
    clickDetection();
})

canvasColorPicker.addEventListener("mousemove", (e) => {
    colorPickerCrosshairX = e.clientX;
    colorPickerCrosshairY = e.clientY;
    colorClickX = e.offsetX
    colorClickY = e.offsetY
    colorSelectionCrosshair.style.top = colorPickerCrosshairY - 10 + "px";
    colorSelectionCrosshair.style.left = colorPickerCrosshairX - 10 + "px"
    updateRGB()
})

cancelButton.addEventListener("click", () => {
    colorPickerWindow.style.display = "none";
    colorSelectionCrosshair.style.display = "none";
})

// script.js

canvas.addEventListener("mousemove", (e) => {
    mousePosX = e.offsetX;
    mousePosY = e.offsetY;
})
document.addEventListener("keypress", (e) => {
    if(e.key === "t"){
        toolWheel.style.top = mousePosY - 150 + "px";
        toolWheel.style.left = mousePosX - 150 + "px";
        toolWheel.style.display = "block";
    }
})
canvas.addEventListener("mousedown", (e) => {
    drawing = true; mousePosXLast = e.offsetX; mousePosYLast = e.offsetY;
    if (tool === "fill") {
        let fillColor = hexToRGB(color)
        fill(mousePosX, mousePosY, fillColor);
    }    
});
canvas.addEventListener("mouseup", () => {drawing = false;});
canvas.addEventListener("mousemove", (e) => {
    if (tool !== "pencil" && !draggingColorPickerWindow){
        crosshair.style.width = size + "px";
        crosshair.style.height = size + "px";
        crosshair.style.top = e.clientY - size/2 + "px";
        crosshair.style.left = e.clientX - size/2 + "px";
        crosshair.style.borderRadius = "100%";
    } else if (tool === "pencil" && !draggingColorPickerWindow){
        crosshair.style.width = size + "px";
        crosshair.style.height = size + "px";
        crosshair.style.top = e.clientY - size/2 + "px";
        crosshair.style.left = e.clientX - size/2 + "px";
        crosshair.style.borderRadius = "0";
    }
})
canvas.addEventListener("mouseleave", () => {drawing = false})

canvas.addEventListener("mousemove", (e) => {
    if(!drawing) return
    switch (tool) {
        case "pen":
            ctx.beginPath()
            ctx.moveTo(mousePosXLast, mousePosYLast);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.lineCap = "round";
            ctx.strokeStyle = color;
            ctx.lineWidth = size;
            ctx.stroke();
            ctx.closePath();
            mousePosXLast = e.offsetX;
            mousePosYLast = e.offsetY;
            break;
        case "pencil": 
            ctx.beginPath()
            ctx.moveTo(mousePosXLast, mousePosYLast);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.lineCap = "butt";
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.closePath()
            mousePosXLast = e.offsetX;
            mousePosYLast = e.offsetY;
            break;
        case "eraser":
            ctx.globalCompositeOperation = "destination-out";
            ctx.moveTo(mousePosXLast, mousePosYLast);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.lineCap = "round";
            ctx.strokeStyle = color;
            ctx.lineWidth = size;
            ctx.stroke();
            ctx.closePath();
            ctx.globalCompositeOperation = "source-over";
            mousePosXLast = e.offsetX;
            mousePosYLast = e.offsetY;
            break;
    }
})