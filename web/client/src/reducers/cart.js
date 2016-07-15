const initialState = {
    items: localStorage.getItem('CART_ITEMS') ? JSON.parse(localStorage.getItem('CART_ITEMS')) : [],
    orderPlaced: false
}


export default function cart(state = initialState, action) {

    switch (action.type) {
        case 'CART_REMOVE_ITEM':
            return { ...state, items: state.items.filter(item => item.id != action.payload) };
        case 'CART_EMPTY':
            return { ...state, items: action.payload };
        case 'CART_ADD_ITEM':
            return Object.assign({}, state, { items: [...state.items, action.payload] });
        case 'CART_PLACE_ORDER_SUCCESS':
            return { ...state, orderPlaced: action.payload };
        case 'CART_PLACE_ORDER_ERROR':
            return { ...state, orderPlaced: action.payload };
        case 'CART_PLACE_ORDER_REQUEST':
            return { ...state, orderPlaced: action.payload };
        default:
            return state;
    }

}