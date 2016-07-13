import React from 'react'
import App from '../containers/App'
import Home from '../containers/Home'
import Item from '../containers/Item'
import CartOrder from '../containers/CartOrder'
import Login from '../containers/Login'
import Register from '../containers/Register'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

export default (
    <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path="item" component={Item}/>
        <Route path="order" component={CartOrder}/>
        <Route path="signin" component={Login}/>
        <Route path="register" component={Register}/>
    </Route>
)