const initialState = {
    color: ""
}


export default function colorControl(state = initialState, action) {

    switch (action.type) {
        case 'SET_COLOR':
            return { ...state, color: action.payload };

        default:
            return state;
    }

}