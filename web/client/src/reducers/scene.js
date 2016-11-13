const initialState = {
    canvas: null,
    object: null,
    material: null,
    logos: {
        'Roof_logo': null,
        'DoorLeftTop_logo': null,
        'DoorLeftCenter_logo': null,
        'DoorLeftBottom_logo': null,
        'DoorRightTop_logo': null,
        'DoorRightCenter_logo': null,
        'DoorRightBottom_logo': null,
        'Front_logo': null,
        'BackLeft_logo': null,
        'BackRight_logo': null,
        'SpoilerTop_logo': null,
        'SpoilerLeft_logo': null,
        'SpoilerRight_logo': null,
        'WingBackLeft_logo': null,
        'WingBackRight_logo': null,
        'WingLeftTop_logo': null,
        'WingLeftBottom_logo': null,
        'WingRightTop_logo': null,
        'WingRightBottom_logo': null,
        'HoodBackCenter_logo': null,
        'HoodRight_logo': null,
        'HoodLeft_logo': null,
        'HoodFrontCenter_logo': null,
        'DoorLeftTopTwo_logo': null,
        'DoorRightTopTwo_logo': null,
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