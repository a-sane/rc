import {checkHttpStatus, parseJSON} from '../utils/index';
import constants from '../constants';
import {push} from 'redux-router';
import jwtDecode from 'jwt-decode';

const {LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER} = constants;

export function loginUserSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            token: token
        }
    }
}

export function loginUserFailure(error) {
    localStorage.removeItem('token');
    return function (dispatch) {
        dispatch(
            {
                type: LOGIN_USER_FAILURE,
                payload: {
                    status: '',
                    statusText: error.statusText
                }
            }
        )
        dispatch(
            {
                type: 'MODAL_SHOW',
                payload: {
                    show: true,
                    body: error.statusText
                }
            }
        )
    }
}

export function loginUserRequest() {
    return {
        type: LOGIN_USER_REQUEST
    }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout());
        dispatch(push('/signin'));
    }
}


export function login(credentials, redirect = "/") {
    return function (dispatch) {
        dispatch(loginUserRequest())
        var params = new URLSearchParams();
        params.append('_username', credentials.username);
        params.append('_password', credentials.password);

        return fetch('/api/login_check', {
            method: 'post',
            credentials: 'include',
            body: params
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    let decoded = jwtDecode(response.token);
                    dispatch(loginUserSuccess(response.token));
                    dispatch(push(redirect));
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                error.response.json().then(function (data) {
                    (data.statusText != 'undefined' && data.statusText) ? error.statusText = data.statusText : error.statusText = 'Bad credentials';
                    dispatch(loginUserFailure(error));
                })
            })
    }
}