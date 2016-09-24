import React, { PropTypes, Component } from 'react'

export default class TextureSecondControl extends Component {

    static propTypes = {
        texturesSecond: PropTypes.array,
        texturePath: PropTypes.string,
        setTexturePath: PropTypes.func.isRequired,
        setTextureSecondPath: PropTypes.func.isRequired,
        getTexturesSecond: PropTypes.func.isRequired,
    }

    onTextureSecondClick(texturePath, color, textureSecondPath) {
        this.props.setTexturePath(texturePath, color);
        this.props.setTextureSecondPath(texturePath, textureSecondPath ? textureSecondPath : '', color);
    }

    componentWillMount() {
        this.props.getTexturesSecond();
    }

    render() {
        const { texturePath, textureSecondPath, color, texturesSecond } = this.props;

       /*const texturesSecond = [
           'skulls.png',
           'leaves.png',
           'oatumn.png'
       ];*/


        return (
            <div className="controls__texture-items">
                <div
                    className={ textureSecondPath === '' ? 'controls__texture-item selected' : 'controls__texture-item' }
                    style={{ backgroundImage: "url('/img/ico_noimage.png')" }}
                    onClick={ this.onTextureSecondClick.bind(this, texturePath, color, '') }
                />
                { texturesSecond.map((item, index) => {
                    return (
                        <div
                            className={ textureSecondPath === item ? 'controls__texture-item' +
                            ' selected' : 'controls__texture-item' }
                            key={`texture_second_${index}`}
                            style={{ backgroundImage: `url("${item}")` }}
                            onClick={ this.onTextureSecondClick.bind(this, texturePath, color, item) }
                        />
                    )
                }) }
            </div>
        )
    }
}
