import { combineReducers } from 'redux'
import textureControl from './textureControl'
import logoControl from './logoControl'
import colorControl from './colorControl'
import item from './item'
import cart from './cart'
import scene from './scene'
import login from './login'
import modal from './modal'
import zoomControl from './zoomControl'
import textLogoControl from './textLogoControl'
import {reducer as formReducer} from 'redux-form'
import {routerStateReducer} from 'redux-router';

export default combineReducers({
    textureControl,
    logoControl,
    colorControl,
    item,
    cart,
    scene,
    login,
    modal,
    zoomControl,
    textLogoControl,
    form: formReducer,
    router: routerStateReducer
})