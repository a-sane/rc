import React, {PropTypes, Component} from 'react'
import ColorPicker from 'rc-color-picker'
import 'rc-color-picker/assets/index.css';
import { throttle } from "lodash";

export default class TextLogoControl extends Component {
    constructor() {
        super();
        this.state = {
            fontFamily: "Arial",
        };
    }

    static propTypes = {
        textLogoPath: PropTypes.string,
        setTextLogo: PropTypes.func.isRequired,
        setTextLogoColor: PropTypes.func.isRequired
    }

    setColorHandler(color) {
        this.props.setTextLogoColor(color.color);
        this.props.setTextLogo(this.refs.textLogoVal.value, color.color, this.state.fontFamily);
    }

    onFontClick(fontFamily) {
        this.props.setTextLogo(this.refs.textLogoVal.value, this.props.color, fontFamily);
        this.setState({ fontFamily: fontFamily });
    }

    render() {

        const fonts = [
            "Arial",
            "Lobster",
            "Tahoma",
            "Georgia",
            "Times New Roman",
            "Impact"
        ];

        return (
            <div className="controls__logo-text">
                <div className="controls__logo-text-tw">
                    <input
                        className="controls__logo-text-input"
                        type="text" ref="textLogoVal"
                        placeholder="Type your text here"
                        maxLength="9"
                        onChange={ this.onFontClick.bind(this, this.state.fontFamily) }
                    />
                    <ColorPicker onChange={::this.setColorHandler} color={this.props.color}/>
                </div>
                <div className="controls__logo-text-items">
                    { fonts.map((item, index) => {
                        return (
                            <div
                                className={ this.state.fontFamily === item ? 'controls__logo-text-item selected' : 'controls__logo-text-item' }
                                key={`text_${index}`}
                                style={{ fontFamily: item }}
                                onClick={ this.onFontClick.bind(this, item) }
                            >
                                Aa
                            </div>
                        )
                    }) }
                </div>
                <span style={{fontFamily: 'Lobster'}}>&nbsp;</span>
            </div>
        )
    }
}