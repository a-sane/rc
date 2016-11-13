const initialState = {
    cars: [],
    car: null
}


export default function item(state = initialState, action) {

    switch (action.type) {
        case 'GET_CARS_REQUEST':
            return { ...state, cars: [] };
        case 'GET_CARS_SUCCESS':
            return { ...state, cars: action.payload, car: action.payload[0] };
        case 'GET_CARS_FAIL':
            return { ...state, cars: [] };
        case 'SET_CAR':
            return { ...state, car: action.payload };
        default:
            return state;
    }

}