import {checkHttpStatus, parseJSON} from '../utils/index';
import {push} from 'redux-router';

export function placeOrder(items, login) {
    return function (dispatch) {
        dispatch({
            type: 'CART_PLACE_ORDER_REQUEST',
            payload: false
        })
        fetch('/place_order', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items: items, user: login})
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                console.log(response);
                dispatch({
                    type: 'CART_PLACE_ORDER_SUCCESS',
                    payload: true
                })
            })
            .catch(error => {
                dispatch({
                    type: 'CART_PLACE_ORDER_ERROR',
                    payload: false
                })
                error.response.json().then(function (data) {
                    console.log(data);
                })
            })
    }
}

export function removeFromCart(item) {
    return {
        type: 'CART_REMOVE_ITEM',
        payload: item
    }
}
