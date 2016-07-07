import React, {PropTypes, Component} from 'react'
import {modelPath} from '../constans'

export default class LogoControl extends Component {
    static propTypes = {
        logoPath: PropTypes.string,
        setLogoPath: PropTypes.func.isRequired
    }

    static defaultProps = {
        logoPath: ''
    }

    onLogoClick(e) {
        e.preventDefault();
        this.props.setLogoPath(e.target.getAttribute('src') ? e.target.getAttribute('src') : '');
    }

    render() {
        const { logoPath } = this.props;
        let logos = ['rc_logo1.png', 'f1.png', 'redbull2.png'];

        let logosLinksTemplate = logos.map((item, index) => {
            return (
                <a
                    href="#"
                    className={logoPath === `${modelPath}${item}` ? 'controls-selected' : ''}
                    key={`logo_${index}`}
                >
                    <img src={`${modelPath}${item}`} alt="" width="50" onClick={::this.onLogoClick}/>
                </a>
            )
        })

        return (
            <div>
                <a href="#" class="controls-selected" onClick={::this.onLogoClick}>
                    no image
                </a>
                {logosLinksTemplate}
            </div>
        )
    }
}