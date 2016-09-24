import {checkHttpStatus, parseJSON} from '../utils/index';

export function setLogoPath(path) {
    return {
        type: 'SET_LOGO_PATH',
        payload: path
    }
}

export function getLogos() {
    return function (dispatch) {
        dispatch({
            type: 'GET_LOGOS_REQUEST'
        });
        return fetch('/api/get_textures/logo', {
            method: 'get'
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch({
                        type: 'GET_LOGOS_SUCCESS',
                        payload: response
                    })
                } catch (e) {
                    dispatch({
                        type: 'GET_LOGOS_FAIL',
                        payload: response
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: 'GET_LOGOS_FAIL',
                    payload: response
                })
            })
    }
}