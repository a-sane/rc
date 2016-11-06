import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Controls from './Controls'
import { uniqueId } from 'lodash'

import Scene from '../components/Scene'
import { setSceneCanvas, setSceneObject, setSceneMaterial, setSceneLogos, setSceneItem } from '../actions/SceneActions'

import { addToCart } from '../actions/CartActions'

class Item extends Component {

    onAddToCartClick(e) {
        e.preventDefault();

        let texturePath = "";
        if(this.props.textureControl.texturePath) {
            let texturePath = this.props.textureControl.texturePath;
        } else if(this.props.textureControl.textureSecondPath) {
            let texturePath = this.props.textureControl.textureSecondPath;
        }

        const item = {
            id: uniqueId('cart_item_'),
            texturePath: texturePath,
            color: this.props.colorControl.color ? this.props.colorControl.color : '#ff0000',
            screenshot: this.props.scene.canvas.toDataURL(),
            logos: this.props.scene.logos,
            price: this.props.item.price,
            name: this.props.item.name
        }
        this.props.addToCart(item);
    }

    onSelectorClick(item) {
        this.props.setSceneItem(item);
    }

    render() {
        const {textureControl, logoControl, colorControl, zoomControl, scene, item} = this.props

        return (
            <div className="product">
                <div className="product__selector">
                    <div className="product__selector-items">
                        <div
                            className={ this.props.scene.item === "car4" ? "product__selector-item selected" : "product__selector-item" }
                            onClick={ () => this.onSelectorClick("car4") }
                        >
                            <div className="product__selector-item-img">
                                <img src="/img/car_1.jpg" alt="KRAKEN RC TSK-B CLASS 1"/>
                            </div>
                            <div className="product__selector-item-title">
                                KRAKEN RC TSK-B CLASS 1
                            </div>
                        </div>
                        <div
                            className={ this.props.scene.item === "car2" ? "product__selector-item selected" : "product__selector-item" }
                            onClick={ () => this.onSelectorClick("car2") }>
                            <div className="product__selector-item-img">
                                <img src="/img/car_2.jpg" alt="kraken rc sx5 sidewinder"/>
                            </div>
                            <div className="product__selector-item-title">
                                kraken rc sx5 sidewinder
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product__top">
                    <section className="product__description">
                        <h2 className="product__header">{item.name}</h2>
                        <div className="product__price">$ {item.price}</div>
                        <article className="product__text">{item.description}</article>
                    </section>
                    <div className="product__image">
                        <img src="/img/car.jpg" alt="KRAKEN RC TSK-B CLASS 1"/>
                    </div>
                </div>
                <div className="product__constructor">
                    <Scene
                        { ...textureControl }
                        { ...logoControl }
                        { ...colorControl }
                        { ...zoomControl }
                        canvas={ scene.canvas }
                        object={ scene.object }
                        material={ scene.material }
                        item={ scene.item }
                        logos={ scene.logos }
                        setSceneCanvas={ this.props.setSceneCanvas }
                        setSceneObject={ this.props.setSceneObject }
                        setSceneMaterial={ this.props.setSceneMaterial }
                        setSceneLogos={ this.props.setSceneLogos }
                    />
                    <Controls />
                </div>
                <div className="product__add">
                    <div className="product__add-btn" onClick={ ::this.onAddToCartClick }>ADD TO CART</div>
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
        zoomControl: state.zoomControl,
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
        setSceneItem: bindActionCreators(setSceneItem, dispatch),
        addToCart: bindActionCreators(addToCart, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Item)