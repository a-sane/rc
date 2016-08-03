const initialState = {
    color: "#000000",
}


export default function textLogoControl(state = initialState, action) {

    switch (action.type) {
        case 'SET_TEXT_LOGO_COLOR':
            return { ...state, color: action.payload };

        default:
            return state;
    }

}