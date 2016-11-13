import React, {PropTypes, Component} from 'react'

export default class LogoControl extends Component {
    static propTypes = {
        logoPath: PropTypes.string,
        setLogoPath: PropTypes.func.isRequired,
        logos: PropTypes.array,
        getLogos: PropTypes.func.isRequired,
        car: PropTypes.object.isRequired
    }

    onLogoClick(logoPath) {
        this.props.setLogoPath(logoPath ? logoPath : '');
    }

    componentWillMount() {
        this.props.getLogos(this.props.car.id);
    }

    render() {
        const { logoPath, logos } = this.props;

        return (
            <div className='controls__logo-img'>
                <div
                    className={ logoPath === '' ? 'controls__logo-img-item selected' : 'controls__logo-img-item' }
                    style={{ backgroundImage: 'url(/img/ico_noimage.png)' }}
                    onClick={ this.onLogoClick.bind(this, '') }
                />
                { logos.map((item, index) => {
                    return (
                        <div
                            className={ logoPath === item ? 'controls__logo-img-item selected' : 'controls__logo-img-item' }
                            key={`logo_${index}`}
                            style={{ backgroundImage: `url("${item}")` }}
                            onClick={ this.onLogoClick.bind(this, item) }
                        />
                    )
                }) }
            </div>
        )
    }
}