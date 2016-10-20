import React, {PropTypes, Component} from 'react'

export default class ZoomControl extends Component {
    static propTypes = {
        zoomFactor: PropTypes.number,
        setZoomFactor: PropTypes.func.isRequired,
    }

    static defaultProps = {
        zoomFactor: 10,
    }

    onZoomInClick(e) {
        e.preventDefault()
        this.props.zoomFactor <= 15 ? this.props.setZoomFactor(this.props.zoomFactor + 1) : null;
    }

    onZoomOutClick(e) {
        e.preventDefault();
        this.props.zoomFactor >= 8 ? this.props.setZoomFactor(this.props.zoomFactor - 1) : null;
    }

    render() {
        return (
            <div>
                <button className="controls-selected" onClick={this.onZoomInClick.bind(this)}>
                    +
                </button>
                <button className="controls-selected" onClick={this.onZoomOutClick.bind(this)}>
                    -
                </button>
            </div>
        )
    }
}
