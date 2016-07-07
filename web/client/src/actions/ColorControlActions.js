export function setColor(color) {
    return function (dispatch) {
        dispatch({
            type: 'SET_TEXTURE_PATH',
            payload: ''
        })
        dispatch({
            type: 'SET_TEXTURE_SECOND_PATH',
            payload: ''
        })
        dispatch({
            type: 'SET_COLOR',
            payload: color
        })
    }
}