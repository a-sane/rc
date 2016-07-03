import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import Home from './containers/Home'
import Item from './containers/Item'
import CartOrder from './containers/CartOrder'
import configureStore from './store/configureStore'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

const store = configureStore()

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Home} />
                <Route path="item" component={Item} />
                <Route path="order" component={CartOrder} />
            </Route>
        </Router>
    </Provider>,
document.getElementById('root')
)