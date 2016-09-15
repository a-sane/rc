import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import TextureControl from '../components/TextureControl'
import TextureSecondControl from '../components/TextureSecondControl'
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

    constructor() {
        super();
        this.state = {
            isTexture: false,
            isLogo: true
        };
    }

    handleSwitchExterior() {
        this.setState({ isTexture: !this.state.isTexture });
    }

    handleSwitchLogo() {
        this.setState({ isLogo: !this.state.isLogo });
    }

    render() {
        const {textureControl, logoControl, colorControl, zoomControl, textLogoControl} = this.props
        const {setTexturePath, setTextureSecondPath} = this.props.textureControlActions
        const {setLogoPath} = this.props.logoControlActions
        const {setColor} = this.props.colorControlActions
        const {setZoomFactor} = this.props.zoomControlActions
        const {setTextLogo, setTextLogoColor} = this.props.textLogoControlActions

        const palette = [
            "#f61922",
            "#248dfc",
            "#29b784",
            "#fc7406",
            "#f0c600",
            "#101011",
            "#d6cfbf",
            "#b8b6c1",
            "#6c6c6c",
            "#116798"
        ];

        return (
            <div className="product__constructor-controls controls">
                <div className="controls__exterior">
                    <div className="controls__title">
                        Exterior
                    </div>
                    <div className="controls__exterior-switcher">
                        <span>COLOR</span>
                        <div className="rc-ui__switcher">
                            <input type="checkbox" id="switcher_exterior" />
                            <label htmlFor="switcher_exterior" onClick={ ::this.handleSwitchExterior } />
                        </div>
                        <span>TEXTURE</span>
                    </div>
                </div>
                <div className={ this.state.isTexture ? 'controls__second-texture' : 'hidden' }>
                    <TextureControl color={colorControl.color} setTexturePath={setTexturePath}
                                          setTextureSecondPath={setTextureSecondPath} texturePath={textureControl.texturePath}
                                          textureSecondPath={textureControl.textureSecondPath}/>
                </div>
                <div className={ this.state.isTexture ? 'hidden' : 'controls__color' }>
                    <div className="controls__color-current">
                        <div className="controls__stitle">Current</div>
                        <ColorControl setColor={setColor} color={colorControl.color}/>
                    </div>
                    <div className="controls__color-standard">
                        <div className="controls__stitle">Standard Colors</div>
                        <div className="controls__color-palette">
                            { palette.map((el, i) =>
                                <div className="controls__color-palette-item" key={ i } style={{ backgroundColor: el }} onClick={ () => setColor(el) }/>
                            ) }
                        </div>
                    </div>
                </div>
                <div className="controls__texture">
                    <div className="controls__title">
                        Second Texture
                    </div>
                    <TextureSecondControl color={colorControl.color} setTexturePath={setTexturePath}
                                    setTextureSecondPath={setTextureSecondPath} texturePath={textureControl.texturePath}
                                    textureSecondPath={textureControl.textureSecondPath}/>
                </div>

                <div className="controls__logo">
                    <div className="controls__logo-header">
                        <div className="controls__title">
                            Logo
                        </div>
                        <div className="controls__logo-header-switcher">
                            <span>Image</span>
                            <div className="rc-ui__switcher">
                                <input type="checkbox" id="switcher_logo" />
                                <label htmlFor="switcher_logo" onClick={ ::this.handleSwitchLogo } />
                            </div>
                            <span>Text</span>
                        </div>
                    </div>
                    <div className={ this.state.isLogo ? 'controls__logo-img' : 'hidden' }>
                        <LogoControl setLogoPath={setLogoPath} logoPath={logoControl.logoPath}/>
                    </div>
                    <div className={ this.state.isLogo ? 'hidden' : 'controls__logo-text' }>
                        <TextLogoControl setTextLogo={setTextLogo} setTextLogoColor={setTextLogoColor}
                                         color={textLogoControl.color}/>
                    </div>
                </div>

                <div className="hidden">
                    Zoom<br/>
                    <ZoomControl setZoomFactor={setZoomFactor} zoomFactor={zoomControl.zoomFactor}/>
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