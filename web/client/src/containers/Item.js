import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Controls from './Controls'
import { uniqueId } from 'lodash'
import classNames from 'classnames';

import Scene from '../components/Scene'

import { setSceneCanvas, setSceneObject, setSceneMaterial, setSceneLogos } from '../actions/SceneActions'
import { getCars, selectItem } from '../actions/ItemActions'
import { addToCart } from '../actions/CartActions'

class Item extends Component {

    componentWillMount() {
        this.props.getCars();
    }

    onAddToCartClick(e) {
        e.preventDefault()

        let texturePath = '';
        if(this.props.textureControl.texturePath) {
            texturePath = this.props.textureControl.texturePath;
        } else if(this.props.textureControl.textureSecondPath) {
            texturePath = this.props.textureControl.textureSecondPath;
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

    onSelectorClick = (item) => {
        this.props.selectItem(item);
    }

    render() {
        const { textureControl, logoControl, colorControl, zoomControl, scene, item } = this.props

        if (item.car) {
            return (
                <div className='product'>
                    <div className='product__selector'>
                        <div className='product__selector-items'>
                            { item.cars.map((car, index) => {
                                return (
                                    <div
                                        className={ classNames('product__selector-item', {'selected' : item.car.modelFileName === car.modelFileName}) }
                                        onClick={ () => this.onSelectorClick(car) }
                                        key={`car_selector_${index}`}
                                    >
                                        <div className='product__selector-item-img'>
                                            <img src={`/upload/car/${car.imageName}`} alt='KRAKEN RC TSK-B CLASS 1'/>
                                        </div>
                                        <div className='product__selector-item-title'>
                                            { car.name }
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='product__top'>
                        <section className='product__description'>
                            <h2 className='product__header'>{item.car.name}</h2>
                            <div className='product__price'>$ {item.car.price}</div>
                            <article className='product__text'>{item.car.description}</article>
                        </section>
                        <div className='product__image'>
                            <img src='/img/car.jpg' alt='KRAKEN RC TSK-B CLASS 1'/>
                        </div>
                    </div>
                    <div className='product__constructor'>
                        <Scene
                            { ...textureControl }
                            { ...logoControl }
                            { ...colorControl }
                            { ...zoomControl }
                            canvas={ scene.canvas }
                            object={ scene.object }
                            material={ scene.material }
                            item={ item.car.modelFileName }
                            logos={ scene.logos }
                            setSceneCanvas={ this.props.setSceneCanvas }
                            setSceneObject={ this.props.setSceneObject }
                            setSceneMaterial={ this.props.setSceneMaterial }
                            setSceneLogos={ this.props.setSceneLogos }
                        />
                        <Controls />
                    </div>
                    <div className='product__add'>
                        <div className='product__add-btn' onClick={ ::this.onAddToCartClick }>ADD TO CART</div>
                    </div>
                </div>
            )
        } else {
            return null;
        }

    }
}

export default connect(
    (state) => {
        return {
            textureControl: state.textureControl,
            logoControl: state.logoControl,
            colorControl: state.colorControl,
            zoomControl: state.zoomControl,
            scene: state.scene,
            item: state.item
        }
    },
    (dispatch) => {
        return {
            setSceneCanvas: bindActionCreators(setSceneCanvas, dispatch),
            setSceneObject: bindActionCreators(setSceneObject, dispatch),
            setSceneMaterial: bindActionCreators(setSceneMaterial, dispatch),
            setSceneLogos: bindActionCreators(setSceneLogos, dispatch),
            getCars: bindActionCreators(getCars, dispatch),
            selectItem: bindActionCreators(selectItem, dispatch),
            addToCart: bindActionCreators(addToCart, dispatch)
        }
    }
)(Item)