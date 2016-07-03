export function removeFromCart(item) {
    return {
        type: 'CART_REMOVE_ITEM',
        payload: item
    }
}

export function emptyCart() {
    return {
        type: 'CART_EMPTY',
        payload: []
    }
}