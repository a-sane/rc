import React, {PropTypes, Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Controls from './Controls'
import {uniqueId} from 'lodash'

import Scene from '../components/Scene'
import {setSceneCanvas} from '../actions/SceneActions'

import {addToCart} from '../actions/ItemActions'

class Item extends Component {
    static propTypes = {
        addToCart: PropTypes.func
    }

    static defaultProps = {
        addToCart: () => {},
    }

    onAddToCartClick(e) {
        e.preventDefault();
        const item = {
            id: uniqueId('cart_item_'),
            texturePath: this.props.textureControl.texturePath,
            logoPath: this.props.logoControl.logoPath,
            color: this.props.colorControl.color ? this.props.colorControl.color : '#ff0000',
            screenshot: this.props.scene.canvas.toDataURL()
        }
        this.props.addToCart(item);
    }

    render() {
        const {textureControl, logoControl, colorControl, scene} = this.props

        return (
            <div className="product">
                <div className="container">
                    <div className="col-md-12 product-price1">
                        <div className="col-md-12 single-top-in simpleCart_shelfItem">
                            <div className="single-para ">
                                <h4>Lorem Ipsum</h4>

                                <h5 className="item_price">$ 2595.00</h5>

                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                                    diam nonummy nibh euismod tincidunt ut laoreet dolore
                                    magna aliquam erat </p>

                                <Controls />
                                <Scene
                                    {...textureControl}
                                    {...logoControl}
                                    {...colorControl}
                                    canvas={scene.canvas}
                                    setSceneCanvas={this.props.setSceneCanvas}
                                />
                                <a href="#" className="add-cart item_add" onClick={::this.onAddToCartClick}>ADD TO CART</a>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        textureControl: state.textureControl,
        logoControl: state.logoControl,
        colorControl: state.colorControl,
        scene: state.scene
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSceneCanvas: bindActionCreators(setSceneCanvas, dispatch),
        addToCart: bindActionCreators(addToCart, dispatch)
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Item)