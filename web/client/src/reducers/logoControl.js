const initialState = {
    logoPath: "",
}


export default function logoControl(state = initialState, action) {

    switch (action.type) {
        case 'SET_LOGO_PATH':
            return { ...state, logoPath: action.payload };

        default:
            return state;
    }

}