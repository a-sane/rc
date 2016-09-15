import React, { PropTypes, Component } from 'react'
import { modelPath } from '../constans'

export default class TextureControl extends Component {
    static propTypes = {
        texturePath: PropTypes.string,
        setTexturePath: PropTypes.func.isRequired,
        setTextureSecondPath: PropTypes.func.isRequired
    }

    onTextureClick(texturePath, color) {
        this.props.setTexturePath(texturePath, color);
        this.props.setTextureSecondPath(texturePath, '', color);
    }

    render() {
        const { texturePath, color } = this.props;

        const textures = [
            'rc_bg5.jpg',
            'rc_geometric.jpg',
            'rc_camo.jpg',
            'rc_tech2.jpg',
            'camo.png',
            'fire.jpg',
            'dirt.jpg',
            'metal.jpg',
            'cubes.jpg'
        ];

        return (
            <div className="controls__texture-items">
                <div
                    className={ texturePath === '' ? 'controls__texture-item selected' : 'controls__texture-item' }
                    style={{ backgroundImage: "url('/img/ico_noimage.png')" }}
                    onClick={ this.onTextureClick.bind(this, '', color) }
                />
                { textures.map((item, index) => {
                        return (
                            <div
                                className={ texturePath === `${modelPath}${item}` ? 'controls__texture-item selected' : 'controls__texture-item' }
                                key={ `texture_${index}` }
                                style={{ backgroundImage: `url("${modelPath}${item}")` }}
                                onClick={ this.onTextureClick.bind(this, `${modelPath}${item}`, color) }
                            />
                        )
                }) }
            </div>
        )
    }
}
