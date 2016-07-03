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

    onTextureClick(e) {
        e.preventDefault()
        this.props.setTexturePath(e.target.getAttribute('src'));
        this.props.setTextureSecondPath(e.target.getAttribute('src'), '');
    }

    onTextureSecondClick(texturePath, e) {
        e.preventDefault();
        this.props.setTextureSecondPath(texturePath, e.target.getAttribute('src'));
    }

    render() {
        const { texturePath, textureSecondPath } = this.props;
        let textures = ['camo.png', 'fire.jpg', 'electro.png', 'gold.jpg', 'dirt.jpg', 'metal.jpg', 'cubes.jpg'];
        let texturesSecond = ['skulls.png', 'leaves.png', 'oatumn.png'];

        let textureLinksTemplate = textures.map((item, index) => {
            return (
                <a
                    href="#"
                    className={texturePath === `${modelPath}${item}` ? 'controls-selected' : ''}
                    key={`texture_${index}`}
                >
                    <img src={`${modelPath}${item}`} alt="" width="50" onClick={::this.onTextureClick}/>
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
                    <img src={`${modelPath}${item}`} alt="" width="50" onClick={this.onTextureSecondClick.bind(this, texturePath)}/>
                </a>
            )
        })

        return (
            <div>
                Texture<br/>
                {textureLinksTemplate}<br/><br/>

                Second Texture<br/>
                {textureSecondLinksTemplate}<br/>
            </div>
        )
    }
}
