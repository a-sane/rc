function makeTextLogo(text, color, dispatch) {
    var canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;

    let ctx = canvas.getContext("2d");

    ctx.font = "500px Arial";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(text, 1024, 512);

    dispatch({
        type: 'SET_LOGO_PATH',
        payload: canvas.toDataURL("image/png")
    });
}


export function setTextLogo(text, color) {
    return function (dispatch) {
        makeTextLogo(text, color, dispatch)
    }
}

export function setTextLogoColor(color) {
    return {
        type: 'SET_TEXT_LOGO_COLOR',
        payload: color
    }
}