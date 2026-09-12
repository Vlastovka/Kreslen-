
colorPanelBtn.forEach(button => {
    button.addEventListener("click", () => {
        color = button.value
    })
})

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

init()