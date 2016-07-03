function unionTextures(path1, path2, dispatch) {
    var canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;

    let ctx = canvas.getContext("2d");

    let img1 = new Image();
    img1.src = path1;

    let img2 = new Image();
    img2.src = path2;

    img1.onload = function(){draw()}
    img2.onload = function (){draw()}

    let imagesLoaded = 0;
    function draw() {
        imagesLoaded++;
        if(imagesLoaded == 2) {
            ctx.drawImage(img1, 0, 0);
            ctx.drawImage(img2, 0, 0);
            dispatch({
                type: 'SET_TEXTURE_PATH',
                payload: canvas.toDataURL("image/png")
            });
        }
    }
}


export function setTexturePath(path) {
    return {
        type: 'SET_TEXTURE_PATH',
        payload: path
    }
}

export function setTextureSecondPath(path1, path2) {
    return function (dispatch) {
        dispatch({
            type: 'SET_TEXTURE_SECOND_PATH',
            payload: path2
        });
        unionTextures(path1, path2, dispatch)
    }
}
