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
            <div className="header__cart">
                <Link className="header__cart-link" to="/order">
                    {items.length} items
                </Link>
                {/*<a href="#" className="simpleCart_empty" onClick={::this.emptyCart}>Empty Cart</a>*/}
            </div>
        )
    }
}
