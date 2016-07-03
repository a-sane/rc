const initialState = {
    canvas: null,
}


export default function scene(state = initialState, action) {

    switch (action.type) {
        case 'SET_SCENE_CANVAS':
            return { ...state, canvas: action.payload };
        default:
            return state;
    }

}