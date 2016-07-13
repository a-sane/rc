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
            <div className="header">
                <div className="header-top">
                    <div className="container">
                        <div className="header-left">
                            <ul>
                                {this.props.login.isAuthenticated
                                    ? <li><a href='#' className="lock" onClick={() => this.props.logoutAndRedirect()}>Logout</a></li>
                                    : <li><Link className="lock" to="/signin">Login</Link></li>
                                }
                                {this.props.login.isAuthenticated
                                    ? ''
                                    : <li><Link className="lock" to="/register">Register</Link></li>
                                }
                                <li></li>
                            </ul>
                            <Cart items={cart.items} emptyCart={emptyCart}/>
                            <div className="clearfix"></div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
                <div className="container">
                    <div className="head-top">
                        <div className="logo">
                            <Link to="/"><img src="images/logo.png" alt="" height="50"/></Link>
                        </div>
                        <div className="h_menu4">
                            <ul className="memenu skyblue">
                                <li className="grid"><Link to="/" className="color8">Home</Link></li>
                                <li><Link to="/item" className="color1">Shop</Link></li>
                                <li><a className="color6" href="#">Contact</a></li>
                            </ul>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
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