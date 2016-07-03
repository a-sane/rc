import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import TextureControl from '../components/TextureControl'
import * as textureControlActions from '../actions/TextureControlActions'

import LogoControl from '../components/LogoControl'
import * as logoControlActions from '../actions/LogoControlActions'

import ColorControl from '../components/ColorControl'
import * as colorControlActions from '../actions/ColorControlActions'

class Controls extends Component {
    render() {
        const {textureControl, logoControl, colorControl} = this.props
        const {setTexturePath, setTextureSecondPath} = this.props.textureControlActions
        const {setLogoPath} = this.props.logoControlActions
        const {setColor} = this.props.colorControlActions

        return (
            <div className="available">
                <ul>
                    <li>
                        Color<br/>
                        <ColorControl setColor={setColor} color={colorControl.color} />
                    </li>
                    <li>
                        <TextureControl setTexturePath={setTexturePath} setTextureSecondPath={setTextureSecondPath} texturePath={textureControl.texturePath} textureSecondPath={textureControl.textureSecondPath} />
                    </li>
                    <li>
                        Image<br/>
                        <LogoControl setLogoPath={setLogoPath} logoPath={logoControl.logoPath} />
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
        colorControl: state.colorControl
    }
}

function mapDispatchToProps(dispatch) {
    return {
        textureControlActions: bindActionCreators(textureControlActions, dispatch),
        logoControlActions: bindActionCreators(logoControlActions, dispatch),
        colorControlActions: bindActionCreators(colorControlActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Controls)