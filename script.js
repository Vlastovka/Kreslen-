const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", {
    willReadFrequently: true
});

const toolWheel = document.getElementById("toolWheel");
const toolWheelBtn = document.querySelectorAll("#toolWheel button");

const crosshair = document.getElementById("crosshair");

const panel = document.getElementById("panel");
const colorPanelBtn = document.querySelectorAll("#colorPanel button");
const userColorPanel = document.querySelectorAll("#userColorPabel button");

let mousePosX = 0;
let mousePosY = 0;
let mousePosXLast;
let mousePosYLast;
let size = 20;

let color = "#000000"
let tool = "pen"
let drawing = false;

const colors = [
    "#000000", // Černá
    "#FFFFFF", // Bílá
    "#808080", // Šedá
    "#FF0000", // Červená
    "#800000", // Tmavě červená
    "#FFA500", // Oranžová
    "#FFFF00", // Žlutá
    "#00FF00", // Zelená
    "#008000", // Tmavě zelená
    "#00FFFF", // Tyrkysová
    "#0000FF", // Modrá
    "#000080", // Tmavě modrá
    "#800080", // Fialová
    "#FF00FF", // Purpurová
    "#FFC0CB", // Růžová
    "#A52A2A", // Hnědá
    "#F5F5DC", // Béžová
    "#FFD700"  // Zlatá
]

let userColors = [];

function hexToRGB(hex){
    return[
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
        255
    ]
}

function init(){
// canvas initialize
    canvas.width = 1080;
    canvas.height = 720;
    canvas.style.position = "absolute";
    canvas.style.bottom = "5%";
    canvas.style.left = "5%"
    canvas.style.backgroundColor = "white";

// color init
colorPanelBtn.forEach((button, index) => {
    button.value = colors[index];
    button.style.backgroundColor = colors[index];
})
}

colorPanelBtn.forEach(button => {
    button.addEventListener("click", () => {
        color = button.value
    })
})

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
    if (tool !== "pencil"){
        crosshair.style.width = size + "px";
        crosshair.style.height = size + "px";
        crosshair.style.top = e.clientY - size/2 + "px";
        crosshair.style.left = e.clientX - size/2 + "px";
        crosshair.style.borderRadius = "100%";
    } else if (tool === "pencil"){
        crosshair.style.width = size + "px";
        crosshair.style.height = size + "px";
        crosshair.style.top = e.clientY - size/2 + "px";
        crosshair.style.left = e.clientX - size/2 + "px";
        crosshair.style.borderRadius = "0";
    } else {console.log("No tools selected")}
})
canvas.addEventListener("mouseleave", () => {drawing = false})
toolWheelBtn.forEach(button => {
    button.addEventListener("click", () => {
        toolWheel.style.display = "";
        switch (button.value) {
            case "pen":
                tool = "pen"
                break;
            case "pencil":
                tool = "pencil"
                break;
            case "eraser":
                tool = "eraser"
                break;
            case "fill":
                tool = "fill"
                break;
        }
    })
});

function fill(x, y, color){
    const imageData = ctx.getImageData(0,0, canvas.width, canvas.height);
    const data = imageData.data;

    const index = (y * canvas.width + x) * 4;

    const oldColor = [
        data[index],
        data[index + 1],
        data[index + 2],
        data[index + 3]
    ]

    if(
        oldColor[0] == color[0] &&
        oldColor[1] == color[1] &&
        oldColor[2] == color[2] &&
        oldColor[3] == color[3]
    ) return

    const stack = [[x, y]];

    while(stack.length > 0) {
        const [px, py] = stack.pop();

        if(px < 0 || px >= canvas.width ||
            py < 0 || py >= canvas.height
        ) continue

        const i = (py * canvas.width + px) * 4

        if (
            data[i] !== oldColor[0] ||
            data[i + 1] !== oldColor[1] ||
            data[i + 2] !== oldColor[2] ||
            data[i + 3] !== oldColor[3]
        ){
            continue
        }
            {
            data[i] = color[0];
            data[i + 1] = color[1];
            data[i + 2] = color[2];
            data[i + 3] = color[3];

            stack.push([px + 1, py]);
            stack.push([px - 1, py]);
            stack.push([px, py + 1]);
            stack.push([px, py -1]);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

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

init()