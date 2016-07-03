import { combineReducers } from 'redux'
import textureControl from './textureControl'
import logoControl from './logoControl'
import colorControl from './colorControl'
import item from './item'
import cart from './cart'
import scene from './scene'

export default combineReducers({
    textureControl,
    logoControl,
    colorControl,
    item,
    cart,
    scene
})