import constants from '../constants';
import {pushState} from 'redux-router';
import jwtDecode from 'jwt-decode';

const {LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER} = constants;

const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

export default function login(state = initialState, action) {

    switch (action.type) {
        case 'LOGIN':
            return { ...state, credentials: action.payload };
        case LOGIN_USER_REQUEST:
            return Object.assign({}, state, {
                'isAuthenticating': true,
                'statusText': null
            });
        case LOGIN_USER_SUCCESS:
            return Object.assign({}, state, {
                'isAuthenticating': false,
                'isAuthenticated': true,
                'token': action.payload.token,
                'userName': jwtDecode(action.payload.token).username,
                'statusText': 'You have been successfully logged in.'
            });
        case LOGIN_USER_FAILURE:
            return Object.assign({}, state, {
                'isAuthenticating': false,
                'isAuthenticated': false,
                'token': null,
                'userName': null,
                'statusText': `Authentication Error: ${action.payload.status} ${action.payload.statusText}`
            });
        case LOGOUT_USER:
            return Object.assign({}, state, {
                'isAuthenticated': false,
                'token': null,
                'userName': null,
                'statusText': 'You have been successfully logged out.'
            });
        default:
            return state;
    }

}