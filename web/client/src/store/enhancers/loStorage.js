export const loStorage = store => next => action => {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            var allItems = JSON.parse(localStorage.getItem('CART_ITEMS'));
            if(allItems == null) allItems = [];

            allItems.push(action.payload);
            localStorage.setItem('CART_ITEMS', JSON.stringify(allItems));
            return next(action);
        case 'CART_REMOVE_ITEM':
            var allItems = JSON.parse(localStorage.getItem('CART_ITEMS'));
            if(allItems == null) allItems = [];

            allItems = allItems.filter(item => item.id != action.payload);
            localStorage.setItem('CART_ITEMS', JSON.stringify(allItems));
            return next(action);
        case 'CART_EMPTY':
            localStorage.removeItem('CART_ITEMS');
            return next(action);
    }
    return next(action)
}