import React, {PropTypes, Component} from 'react'
import {modelPath} from '../constans'

export default class TextureControl extends Component {
    static propTypes = {
        texturePath: PropTypes.string,
        setTexturePath: PropTypes.func.isRequired,
        setTextureSecondPath: PropTypes.func.isRequired
    }

    static defaultProps = {
        texturePath: '',
        textureSecondPath: ''
    }

    onTextureClick(color, e) {
        e.preventDefault()
        let texturePath = e.target.getAttribute('src') ? e.target.getAttribute('src') : '';
        this.props.setTexturePath(texturePath, color);
        this.props.setTextureSecondPath(texturePath, '', color);
    }

    onTextureSecondClick(texturePath, color, e) {
        e.preventDefault();
        let textureSecondPath = e.target.getAttribute('src') ? e.target.getAttribute('src') : '';
        this.props.setTextureSecondPath(texturePath, textureSecondPath, color);
    }

    render() {
        const { texturePath, textureSecondPath, color } = this.props;
        let textures = ['rc_geometric.jpg', 'rc_camo.jpg', 'rc_tech1.jpg', 'rc_tech2.jpg', 'rc_tech3.jpg', 'rc_tech4.jpg', 'rc_tech5.jpg', 'rc_tech6.jpg', 'camo.png', 'fire.jpg', 'electro.png', 'gold.jpg', 'dirt.jpg', 'metal.jpg', 'cubes.jpg'];
        let texturesSecond = ['skulls.png', 'leaves.png', 'oatumn.png'];

        let textureLinksTemplate = textures.map((item, index) => {
            return (
                <a
                    href="#"
                    className={texturePath === `${modelPath}${item}` ? 'controls-selected' : ''}
                    key={`texture_${index}`}
                >
                    <img src={`${modelPath}${item}`} alt="" width="50" onClick={this.onTextureClick.bind(this, color)}/>
                </a>
            )
        })

        let textureSecondLinksTemplate = texturesSecond.map((item, index) => {
            return (
                <a
                    href="#"
                    className={textureSecondPath === `${modelPath}${item}` ? 'controls-selected' : ''}
                    key={`texture_second_${index}`}
                >
                    <img src={`${modelPath}${item}`} alt="" width="50" onClick={this.onTextureSecondClick.bind(this, texturePath, color)}/>
                </a>
            )
        })

        return (
            <div>
                Texture<br/>
                <a href="#" class="controls-selected" onClick={this.onTextureClick.bind(this, color)}>
                    no image
                </a>
                {textureLinksTemplate}<br/><br/>

                Second Texture<br/>
                <a href="#" class="controls-selected" onClick={this.onTextureSecondClick.bind(this, texturePath, color)}>
                    no image
                </a>
                {textureSecondLinksTemplate}<br/>
            </div>
        )
    }
}
