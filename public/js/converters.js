function rgbToHex(r, g, b) {
    return "#" + [r, g, b]
        .map(value => value.toString(16).padStart(2, "0"))
        .join("");
};

function hexToRGB(hex){
    return[
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
        255
    ]
};