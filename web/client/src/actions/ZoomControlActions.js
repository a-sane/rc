export function setZoomFactor(zoomFactor) {
    return function (dispatch) {
        dispatch({
            type: 'SET_ZOOM_FACTOR',
            payload: zoomFactor
        })
    }
}