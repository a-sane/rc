import axios from 'axios';

export function placeOrder(items) {
    return function (dispatch) {
        axios.post('/place_order', {
            items: items
        }).then(function (response) {
            dispatch({
                type: 'CART_PLACE_ORDER',
                payload: null
            })
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function removeFromCart(item) {
    return {
        type: 'CART_REMOVE_ITEM',
        payload: item
    }
}
