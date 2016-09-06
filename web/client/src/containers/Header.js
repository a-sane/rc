import React, {PropTypes, Component} from 'react'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Cart from '../components/Cart'
import * as cartActions from '../actions/CartActions'

import {logoutAndRedirect} from '../actions/LoginActions';

export default class Header extends Component {
    render() {
        const {cart, login} = this.props
        const {emptyCart} = this.props.cartActions
        return (
            <header className="header">
                <div className="header__wrapper">
                    <h1 className="header__logo">
                        <Link to="/">
                            <img src="/img/logo.png" alt="RC Skidlidz"/>
                        </Link>
                    </h1>
                    <nav className="header__nav">
                        <div className="header__menu">
                            {this.props.login.isAuthenticated
                                ? <a href='#' className="header__menu-link" onClick={() => this.props.logoutAndRedirect()}>Logout</a>
                                : <Link className="header__menu-link" to="/signin">Login</Link>
                            }
                            {this.props.login.isAuthenticated
                                ? ''
                                : <Link className="header__menu-link" to="/register">Register</Link>
                            }
                        </div>
                        <Cart items={cart.items} emptyCart={emptyCart}/>
                    </nav>
                </div>
            </header>
        )
    }
}


function mapStateToProps(state) {
    return {
        cart: state.cart,
        login: state.login
    }
}

function mapDispatchToProps(dispatch) {
    return {
        cartActions: bindActionCreators(cartActions, dispatch),
        logoutAndRedirect: bindActionCreators(logoutAndRedirect, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)