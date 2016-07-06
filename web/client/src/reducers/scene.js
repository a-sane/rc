const initialState = {
    canvas: null,
    object: null,
    material: null,
    logos: {
        'Roof_logo': null,
        'DoorLeft_logo': null,
        'DoorRight_logo': null,
        'Front_logo': null
    }
}


export default function scene(state = initialState, action) {

    switch (action.type) {
        case 'SET_SCENE_CANVAS':
            return { ...state, canvas: action.payload };
        case 'SET_SCENE_OBJECT':
            return { ...state, object: action.payload };
        case 'SET_SCENE_MATERIAL':
            return { ...state, material: action.payload };
        case 'SET_SCENE_LOGOS':
            return { ...state, logos: action.payload };
        default:
            return state;
    }

}