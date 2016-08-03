import React, {PropTypes, Component} from 'react'
import ColorPicker from 'rc-color-picker'
import 'rc-color-picker/assets/index.css';

export default class TextLogoControl extends Component {
    static propTypes = {
        textLogoPath: PropTypes.string,
        setTextLogo: PropTypes.func.isRequired,
        setTextLogoColor: PropTypes.func.isRequired
    }

    setColorHandler(color) {
        this.props.setTextLogoColor(color.color);
    }

    onApplyClick(e) {
        e.preventDefault();
        this.props.setTextLogo(this.refs.textLogoVal.value ? this.refs.textLogoVal.value : '', this.props.color);
    }

    render() {
        return (
            <div>
                <ColorPicker onChange={::this.setColorHandler} color={this.props.color}/>
                <input type="text" ref="textLogoVal"/>
                <button onClick={::this.onApplyClick}>Apply</button>
            </div>
        )
    }
}