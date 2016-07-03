const initialState = {
    items: localStorage.getItem('CART_ITEMS') ? JSON.parse(localStorage.getItem('CART_ITEMS')) : [],
}


export default function cart(state = initialState, action) {

    switch (action.type) {
        case 'CART_REMOVE_ITEM':
            return { ...state, items: state.items.filter(item => item.id != action.payload) };
        case 'CART_EMPTY':
            return { ...state, items: action.payload };
        case 'CART_ADD_ITEM':
            return Object.assign({}, state, { items: [...state.items, action.payload] });
        default:
            return state;
    }

}