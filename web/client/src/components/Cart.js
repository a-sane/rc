import React, {PropTypes, Component} from 'react'
import { Link } from 'react-router'

export default class Cart extends Component {
    static propTypes = {

    }

    static defaultProps = {
        items: [],
    }

    removeItem(item) {

    }


    emptyCart() {
        this.props.emptyCart();
    }

    render() {
        const { items } = this.props;

        return (
            <div className="cart box_1">
                <Link to="/order">
                    <h3>
                        <div className="total">
                            (<span id="simpleCart_quantity" className="simpleCart_quantity">{items.length}</span> items)
                        </div>
                        <img src="images/cart.png" alt=""/></h3>
                </Link>

                <p><a href="#" className="simpleCart_empty" onClick={::this.emptyCart}>Empty Cart</a></p>
            </div>
        )
    }
}
