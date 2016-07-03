import React, {PropTypes, Component} from 'react'
import ColorPicker from 'rc-color-picker'
import 'rc-color-picker/assets/index.css';

export default class ColorControl extends Component {
    static propTypes = {
        color: PropTypes.string.isRequired,
        setColor: PropTypes.func.isRequired,
    }

    static defaultProps = {
        color: '',
    }

    setColorHandler(color) {
        this.props.setColor(color.color);
    }

    render() {
        return (
            <div>
                <ColorPicker onChange={::this.setColorHandler} color={this.props.color}/>
            </div>
        )
    }
}
