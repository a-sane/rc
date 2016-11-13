import {checkHttpStatus, parseJSON} from '../utils/index';

export function getCars() {
    return function (dispatch) {
        dispatch({
            type: 'GET_CARS_REQUEST'
        });
        return fetch('/api/get_cars', {
            method: 'get'
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch({
                        type: 'GET_CARS_SUCCESS',
                        payload: response
                    })
                } catch (e) {
                    dispatch({
                        type: 'GET_CARS_FAIL',
                        payload: response
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: 'GET_CARS_FAIL',
                    payload: error
                })
            })
    }
}

export function selectItem(item) {
    return function (dispatch) {
        dispatch({
            type: 'SET_CAR',
            payload: item
        })
        dispatch({
            type: 'SET_TEXTURE_PATH',
            payload: null
        })
        dispatch({
            type: 'SET_TEXTURE_SECOND_PATH',
            payload: null
        })
        dispatch({
            type: 'SET_TEXTURE_LOGO_PATH',
            payload: null
        })
    }
}
