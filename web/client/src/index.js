import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import {ReduxRouter} from 'redux-router';
import routes from './routes';
import {loginUserSuccess} from './actions/LoginActions';

const store = configureStore()

let token = localStorage.getItem('token');
if (token !== null) {
    store.dispatch(loginUserSuccess(token));
}

render(
    <Provider store={store}>
        <ReduxRouter>
            {routes}
        </ReduxRouter>
    </Provider>,
document.getElementById('root')
)