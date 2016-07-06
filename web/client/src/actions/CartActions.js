export function emptyCart() {
    return {
        type: 'CART_EMPTY',
        payload: []
    }
}

export function addToCart(item) {
    return {
        type: 'CART_ADD_ITEM',
        payload: item
    }
}