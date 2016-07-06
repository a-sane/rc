import React, {PropTypes, Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Controls from './Controls'
import {uniqueId} from 'lodash'

import Scene from '../components/Scene'
import {setSceneCanvas, setSceneObject, setSceneMaterial, setSceneLogos} from '../actions/SceneActions'

import {addToCart} from '../actions/CartActions'

class Item extends Component {

    onAddToCartClick(e) {
        e.preventDefault();
        const item = {
            id: uniqueId('cart_item_'),
            texturePath: this.props.textureControl.texturePath,
            color: this.props.colorControl.color ? this.props.colorControl.color : '#ff0000',
            screenshot: this.props.scene.canvas.toDataURL(),
            logos: this.props.scene.logos,
            price: this.props.item.price,
            name: this.props.item.name
        }
        this.props.addToCart(item);
    }

    render() {
        const {textureControl, logoControl, colorControl, scene, item} = this.props

        return (
            <div className="product">
                <div className="container">
                    <div className="col-md-12 product-price1">
                        <div className="col-md-12 single-top-in simpleCart_shelfItem">
                            <div className="single-para ">
                                <h4>{item.name}</h4>

                                <h5 className="item_price">$ {item.price}</h5>

                                <p>{item.description}</p>

                                <Controls />
                                <Scene
                                    {...textureControl}
                                    {...logoControl}
                                    {...colorControl}
                                    canvas={scene.canvas}
                                    object={scene.object}
                                    material={scene.material}
                                    logos={scene.logos}
                                    setSceneCanvas={this.props.setSceneCanvas}
                                    setSceneObject={this.props.setSceneObject}
                                    setSceneMaterial={this.props.setSceneMaterial}
                                    setSceneLogos={this.props.setSceneLogos}
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
        scene: state.scene,
        item: state.item
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSceneCanvas: bindActionCreators(setSceneCanvas, dispatch),
        setSceneObject: bindActionCreators(setSceneObject, dispatch),
        setSceneMaterial: bindActionCreators(setSceneMaterial, dispatch),
        setSceneLogos: bindActionCreators(setSceneLogos, dispatch),
        addToCart: bindActionCreators(addToCart, dispatch)
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Item)