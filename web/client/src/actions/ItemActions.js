export function addToCart(item) {
    return {
        type: 'CART_ADD_ITEM',
        payload: item
    }
}