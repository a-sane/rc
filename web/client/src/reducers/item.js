const initialState = {
    name: 'RC Car',
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat',
    price: 2500
}


export default function item(state = initialState, action) {

    switch (action.type) {
        
        default:
            return state;
    }

}