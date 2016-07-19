const initialState = {
    zoomFactor: 10,
}


export default function zoomControl(state = initialState, action) {

    switch (action.type) {
        case 'SET_ZOOM_FACTOR':
            return { ...state, zoomFactor: action.payload };
        default:
            return state;
    }

}