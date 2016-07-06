export function setSceneCanvas(canvas) {
    return {
        type: 'SET_SCENE_CANVAS',
        payload: canvas
    }
}

export function setSceneObject(object) {
    return {
        type: 'SET_SCENE_OBJECT',
        payload: object
    }
}


export function setSceneMaterial(material) {
    return {
        type: 'SET_SCENE_MATERIAL',
        payload: material
    }
}

export function setSceneLogos(logos) {
    return {
        type: 'SET_SCENE_LOGOS',
        payload: logos
    }
}