const initialState = {
    logoPath: "",
    logos: []
}


export default function logoControl(state = initialState, action) {

    switch (action.type) {
        case 'SET_LOGO_PATH':
            return { ...state, logoPath: action.payload };
        case 'GET_LOGOS_REQUEST':
            return { ...state, logos: [] };
        case 'GET_LOGOS_SUCCESS':
            return { ...state, logos: action.payload };
        case 'GET_LOGOS_FAIL':
            return { ...state, logos: [] };
        default:
            return state;
    }

}