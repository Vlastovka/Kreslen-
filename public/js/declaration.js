// script

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", {
    willReadFrequently: true
});

const toolWheel = document.getElementById("toolWheel");
const toolWheelBtn = document.querySelectorAll("#toolWheel button");

const crosshair = document.getElementById("crosshair");

const panel = document.getElementById("panel");
const colorPanelBtn = document.querySelectorAll("#colorPanel button");
const userColorPanel = document.querySelectorAll("#userColorPanel button");

let mousePosX = 0;
let mousePosY = 0;
let mousePosXLast;
let mousePosYLast;
let size = 20;

let colors;
let color = "#000000"
let tool = "pen"
let drawing = false;


// color picker

const canvasColorPicker = document.getElementById("colorPickerMain");
const ctxColorPicker = canvasColorPicker.getContext("2d");
const confirmButton = document.getElementById("confirmButton");
const colorPreview = document.getElementById("colorPreview");
const colorPickerWindow = document.getElementById("colorPickerWindow");
const redValue = document.getElementById("redValue");
const blueValue = document.getElementById("blueValue");
const greenValue = document.getElementById("greenValue");
const hexCode = document.getElementById("hexCode");
const colorSelectionCrosshair = document.getElementById("colorSelectionCrosshair");
const cancelButton = document.getElementById("cancelButton");

let colorPickerCrosshairX = 0;
let colorPickerCrosshairY = 0;

let mouseClickColor = false;

let r = 0;
let g = 0;
let b = 0;

let colorClickX = 0; 
let colorClickY = 0;
let draggingColorPickerWindow = false;

const hueSlider = document.getElementById("hueSlider")
hueSlider.addEventListener("input", ()=> {
    drawColorPicker();
})

fetch("js/colors.json")
    .then(response => response.json())
    .then(data => {
        colors = data.baseColors;
        init()
    })

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
    button.value = colors[index].hex;
    button.style.backgroundColor = colors[index].hex;
})
}