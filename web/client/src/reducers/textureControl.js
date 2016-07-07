const initialState = {
    texturePath: "",
    textureSecondPath: "",
    textureUnionPath: "",
}


export default function textureControl(state = initialState, action) {

    switch (action.type) {
        case 'SET_TEXTURE_PATH':
            return { ...state, texturePath: action.payload };
        case 'SET_TEXTURE_SECOND_PATH':
            return { ...state, textureSecondPath: action.payload };
        case 'SET_TEXTURE_UNION_PATH':
            return { ...state, textureUnionPath: action.payload };
        default:
            return state;
    }

}