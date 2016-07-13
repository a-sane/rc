import {checkHttpStatus, parseJSON} from '../utils/index';
import constants from '../constants';
import {push} from 'redux-router';

const {REGISTER_USER_REQUEST, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS} = constants;

export function registerUserSuccess(credentials) {
    return {
        type: REGISTER_USER_SUCCESS,
        payload: {
            credentials: credentials
        }
    }
}

export function registerUserFailure(error) {
    return {
        type: REGISTER_USER_FAILURE,
        payload: {
            status: '',
            statusText: error.statusText
        }
    }
}

export function registerUserRequest() {
    return {
        type: REGISTER_USER_REQUEST
    }
}


export function register(credentials, redirect = "/signin") {
    return function (dispatch) {
        dispatch(registerUserRequest())
        var params = new URLSearchParams();
        params.append('firstname', credentials.firstname);
        params.append('lastname', credentials.lastname);
        params.append('username', credentials.username);
        params.append('password', credentials.password);

        return fetch('/api/register', {
            method: 'post',
            credentials: 'include',
            body: params
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(registerUserSuccess(response));
                    dispatch(push(redirect));
                } catch (e) {
                    dispatch(registerUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                error.response.json().then(function (data) {
                    data.statusText ? error.statusText = data.statusText : null;
                    dispatch(registerUserFailure(error));
                })
            })

    }
}