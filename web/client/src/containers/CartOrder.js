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

    onFormSubmit(items, login, e) {
        e.preventDefault();
        this.props.cartOrderActions.placeOrder(items, login);
        return false;
    }

    shouldComponentUpdate(nextProps) {
        const {orderPlaced} = nextProps.cart;
        const {orderPlaced: prevOrderPlaced} = this.props.cart;

        if(orderPlaced != prevOrderPlaced && orderPlaced) {
            this.refs.paypalForm.submit();
        }

        return true;
    }

    render() {
        const {cart, login} = this.props;
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
                        <br/><br/>
                        {this.props.login.isAuthenticated ?
                            <div>
                                <form action="https://www.sandbox.paypal.com/cgi-bin/websc" method="post" onSubmit={this.onFormSubmit.bind(this, cart.items, login)} ref="paypalForm">
                                    <input type="hidden" name="cmd" value="_xclick"/>
                                    <input type="hidden" name="business" value="paypal-test2@2sane.ru"/>
                                    <input id="paypalItemName" type="hidden" name="item_name" value="RC Car"/>
                                    <input id="paypalQuantity" type="hidden" name="quantity" value="1"/>
                                    <input id="paypalAmmount" type="hidden" name="amount" value="1500"/>
                                    <input type="hidden" name="no_shipping" value="1"/>
                                    <input type="hidden" name="return" value=""/>
                                    <input type="hidden" name="custom" value=""/>
                                    <input type="hidden" name="currency_code" value="AUD"/>
                                    <input type="hidden" name="lc" value="AU"/>
                                    <input type="hidden" name="bn" value="A4U9QLC6R79S4"/>
                                    <button type="submit" className="continue">
                                        Pay Now with Paypal
                                    </button>
                                </form>
                            </div>
                            : <Link className="continue" to="/signin">Login</Link>
                        }
                    </div>

                    <div className="clearfix"></div>
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
        cartOrderActions: bindActionCreators(cartOrderActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartOrder)