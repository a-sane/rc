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

    onLogoClick(logoPath) {
        this.props.setLogoPath(logoPath ? logoPath : '');
    }

    render() {
        const { logoPath } = this.props;

        const logos = [
            'rc_logo1.png',
            'f1.png',
            'redbull2.png'
        ];

        return (
            <div className="controls__logo-img">
                <div
                    className={ logoPath === '' ? 'controls__logo-img-item selected' : 'controls__logo-img-item' }
                    style={{ backgroundImage: "url('/img/ico_noimage.png')" }}
                    onClick={ this.onLogoClick.bind(this, '') }
                />
                { logos.map((item, index) => {
                    return (
                        <div
                            className={ logoPath === `${modelPath}${item}` ? 'controls__logo-img-item selected' : 'controls__logo-img-item' }
                            key={`logo_${index}`}
                            style={{ backgroundImage: `url("${modelPath}${item}")` }}
                            onClick={ this.onLogoClick.bind(this, `${modelPath}${item}`) }
                        />
                    )
                }) }
            </div>
        )
    }
}