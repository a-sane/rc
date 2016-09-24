const initialState = {
    texturePath: "",
    textureSecondPath: "",
    textureUnionPath: "",
    textures: [],
    texturesSecond: []
}


export default function textureControl(state = initialState, action) {

    switch (action.type) {
        case 'SET_TEXTURE_PATH':
            return { ...state, texturePath: action.payload };
        case 'SET_TEXTURE_SECOND_PATH':
            return { ...state, textureSecondPath: action.payload };
        case 'SET_TEXTURE_UNION_PATH':
            return { ...state, textureUnionPath: action.payload };
        case 'GET_TEXTURES_REQUEST':
            return { ...state, textures: [] };
        case 'GET_TEXTURES_SUCCESS':
            return { ...state, textures: action.payload };
        case 'GET_TEXTURES_FAIL':
            return { ...state, textures: [] };
        case 'GET_TEXTURES_SECOND_REQUEST':
            return { ...state, texturesSecond: [] };
        case 'GET_TEXTURES_SECOND_SUCCESS':
            return { ...state, texturesSecond: action.payload };
        case 'GET_TEXTURES_SECOND_FAIL':
            return { ...state, texturesSecond: [] };
        default:
            return state;
    }

}