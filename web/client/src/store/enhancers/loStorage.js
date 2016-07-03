export const loStorage = store => next => action => {
    if(action.type == 'CART_ADD_ITEM' || action.type == 'CART_REMOVE_ITEM' || action.type == 'CART_EMPTY') {
        var returnedValue = next(action);
        localStorage.setItem('CART_ITEMS', JSON.stringify(store.getState().cart.items));
        return returnedValue;
    }
    return next(action)
}