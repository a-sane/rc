import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {uniqueId} from 'lodash'

import * as cartOrderActions from '../actions/CartOrderActions'

class CartOrder extends Component {

    removeItemFromCart(id) {
        this.props.cartOrderActions.removeFromCart(id);
    }

    placeOrder(items) {
        this.props.cartOrderActions.placeOrder(items);
    }

    render() {
        const {cart} = this.props;
        return (
            <div className="container">
                <div className="check">
                    <h1>My Shopping Bag ({cart.items.length})</h1>
                    <div className="col-md-12 cart-items">
                        {cart.items.map(item => (
                            <div className="cart-header" key={uniqueId('cart_order_item_')}>
                                <div className="close1" onClick={()=>(::this.removeItemFromCart(item.id))}></div>
                                <div className="cart-sec simpleCart_shelfItem">
                                    <div className="cart-item cyc">
                                        <img src={item.screenshot} className="img-responsive" alt=""/>
                                    </div>
                                    <div className="cart-item-info">
                                        <h3><Link to="/item">{item.name}</Link></h3>
                                        <ul className="qty">
                                            <li><p>Size : 5</p></li>
                                        </ul>

                                        <div className="delivery">
                                            <span>Delivered in 2-3 bussiness days</span>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-3 cart-total">
                        <ul className="total_price">
                            <li className="last_price"><h4>TOTAL</h4></li>
                            <li className="last_price"><span>6350.00</span></li>
                            <div className="clearfix"></div>
                        </ul>
                        <button className="continue" onClick={()=>(::this.placeOrder(cart.items))}>Place Order</button>
                    </div>

                    <div className="clearfix"></div>
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
        cartOrderActions: bindActionCreators(cartOrderActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartOrder)