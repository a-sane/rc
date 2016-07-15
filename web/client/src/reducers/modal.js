const initialState = {
    show: false,
};

export default function modal(state = initialState, action) {

    switch (action.type) {
        case 'MODAL_SHOW':
            return Object.assign({}, state, {
                show: action.payload.show,
                body: action.payload.body
            });
        case 'MODAL_HIDE':
            return Object.assign({}, state, {
                show: action.payload.show,
                body: action.payload.body
            });
        default:
            return state;
    }

}