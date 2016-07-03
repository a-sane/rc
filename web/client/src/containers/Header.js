import React, {PropTypes, Component} from 'react'
import { Link } from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Cart from '../components/Cart'
import * as cartActions from '../actions/CartActions'

export default class Header extends Component {
    render() {
        const {cart} = this.props
        const {emptyCart} = this.props.cartActions

        return (
            <div className="header">
                <div className="header-top">
                    <div className="container">
                        <div className="header-left">
                            <Cart items={cart.items} emptyCart={emptyCart} />
                            <div className="clearfix"></div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
                <div className="container">
                    <div className="head-top">
                        <div className="logo">
                            <Link to="/"><img src="images/logo.png" alt="" height="50" /></Link>
                        </div>
                        <div className="h_menu4">
                            <ul className="memenu skyblue">
                                <li className="active grid"><Link to="/" className="color8">Home</Link></li>
                                <li><Link to="/item" className="color1" href="#">Shop</Link></li>
                                <li><a className="color6" href="contact.html">Contact</a></li>
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
        cart: state.cart
    }
}

function mapDispatchToProps(dispatch) {
    return {
        cartActions: bindActionCreators(cartActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)