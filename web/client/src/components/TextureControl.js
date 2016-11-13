import React, { PropTypes, Component } from 'react'

export default class TextureControl extends Component {
    static propTypes = {
        textures: PropTypes.array,
        texturePath: PropTypes.string,
        setTexturePath: PropTypes.func.isRequired,
        setTextureSecondPath: PropTypes.func.isRequired,
        getTextures: PropTypes.func.isRequired,
        car: PropTypes.object.isRequired
    }

    onTextureClick(texturePath, color) {
        this.props.setTexturePath(texturePath, color);
        this.props.setTextureSecondPath(texturePath, '', color);
    }

    componentWillMount() {
        this.props.getTextures(this.props.car.id);
    }

    componentWillReceiveProps(nextProps) {
        this.props.car.id != nextProps.car.id ? this.props.getTextures(nextProps.car.id) : null;
    }

    render() {
        const { texturePath, color, textures } = this.props;

        return (
            <div className='controls__texture-items'>
                <div
                    className={ !texturePath ? 'controls__texture-item selected' : 'controls__texture-item' }
                    style={{ backgroundImage: 'url(/img/ico_noimage.png)' }}
                    onClick={ this.onTextureClick.bind(this, '', color) }
                />
                { textures.map((item, index) => {
                        return (
                            <div
                                className={ texturePath === item ? 'controls__texture-item selected' : 'controls__texture-item' }
                                key={ `texture_${index}` }
                                style={{ backgroundImage: `url("${item}")` }}
                                onClick={ this.onTextureClick.bind(this, item, color) }
                            />
                        )
                }) }
            </div>
        )
    }
}
