const initialState = {
    color: "#ff0000"
}


export default function colorControl(state = initialState, action) {

    switch (action.type) {
        case 'SET_COLOR':
            return { ...state, color: action.payload };
        default:
            return state;
    }

}