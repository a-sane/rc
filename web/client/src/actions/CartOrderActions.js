export function removeFromCart(id) {
    return {
        type: 'CART_REMOVE_ITEM',
        payload: id
    }
}