import React, { PropTypes } from "react";
import Dialog from "rc-dialog";
import { connect } from "react-redux";

class BaseModal extends React.Component {
    static propTypes = {
        show: PropTypes.bool,
        closeBtnLabel: PropTypes.string,
        closeAction: PropTypes.func
    };

    static defaultProps = {
        show: false,
        errorAddr: null,
        closeBtnLabel: "Ok"
    };

    close () {
        this.props.closeAction();
    }


    render () {
        let body = this.props.body

        return (this.props.show)
            ? (
            <Dialog
                visible={this.props.show}
                title={this.props.title}
                onClose={this.close.bind(this)}>

                <div>
                    {body}
                </div>

                <div>
                    <button
                        onClick={this.close.bind(this)}
                        className='close'>
                        {this.props.closeBtnLabel}
                    </button>
                </div>
            </Dialog>
        )
            : <span />;
    }
}

export default BaseModal;