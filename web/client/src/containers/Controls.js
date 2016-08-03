import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import TextureControl from '../components/TextureControl'
import * as textureControlActions from '../actions/TextureControlActions'

import LogoControl from '../components/LogoControl'
import * as logoControlActions from '../actions/LogoControlActions'

import ColorControl from '../components/ColorControl'
import * as colorControlActions from '../actions/ColorControlActions'

import ZoomControl from '../components/ZoomControl'
import * as zoomControlActions from '../actions/ZoomControlActions'

import TextLogoControl from '../components/TextLogoControl'
import * as textLogoControlActions from '../actions/TextLogoControlActions'

class Controls extends Component {
    render() {
        const {textureControl, logoControl, colorControl, zoomControl, textLogoControl} = this.props
        const {setTexturePath, setTextureSecondPath} = this.props.textureControlActions
        const {setLogoPath} = this.props.logoControlActions
        const {setColor} = this.props.colorControlActions
        const {setZoomFactor} = this.props.zoomControlActions
        const {setTextLogo, setTextLogoColor} = this.props.textLogoControlActions

        return (
            <div className="available">
                <ul>
                    <li>
                        Color<br/>
                        <ColorControl setColor={setColor} color={colorControl.color} />
                    </li>
                    <li>
                        <TextureControl color={colorControl.color} setTexturePath={setTexturePath} setTextureSecondPath={setTextureSecondPath} texturePath={textureControl.texturePath} textureSecondPath={textureControl.textureSecondPath} />
                    </li>
                    <li>
                        Image<br/>
                        <LogoControl setLogoPath={setLogoPath} logoPath={logoControl.logoPath} />
                    </li>
                    <li>
                        Text Logo<br/>
                        <TextLogoControl setTextLogo={setTextLogo} setTextLogoColor={setTextLogoColor} color={textLogoControl.color} />
                    </li>
                    <li>
                        Zoom<br/>
                        <ZoomControl setZoomFactor={setZoomFactor} zoomFactor={zoomControl.zoomFactor} />
                    </li>
                </ul>
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
        textLogoControl: state.textLogoControl,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        textureControlActions: bindActionCreators(textureControlActions, dispatch),
        logoControlActions: bindActionCreators(logoControlActions, dispatch),
        colorControlActions: bindActionCreators(colorControlActions, dispatch),
        zoomControlActions: bindActionCreators(zoomControlActions, dispatch),
        textLogoControlActions: bindActionCreators(textLogoControlActions, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Controls)