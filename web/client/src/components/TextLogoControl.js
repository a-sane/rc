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
        let text = this.refs.textLogoVal.value;
        let fontFace = this.refs.textFontFace.value;
        this.props.setTextLogo(text, this.props.color, fontFace);
    }

    render() {
        return (
            <div>
                <ColorPicker onChange={::this.setColorHandler} color={this.props.color}/>
                <span style={{fontFamily: 'Lobster'}}>&nbsp;</span>
                <select name="font_select" id="font_select" style={{marginLeft: 10 + 'px', marginRight: 10 + 'px', width: 150 + 'px'}} ref="textFontFace">
                    <option value="Arial">Arial</option>
                    <option value="Lobster">Lobster</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Impact">Impact</option>
                </select>
                <input type="text" ref="textLogoVal"/>
                <button onClick={::this.onApplyClick}>Apply</button>
            </div>
        )
    }
}