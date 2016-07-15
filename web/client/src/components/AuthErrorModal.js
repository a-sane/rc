import React from "react";
import Modal from "./Modal";

class AuthErrorModal extends React.Component {
    render () {
        return (
            <Modal
                show={this.props.show}
                closeAction={this.props.closeAction}
                title="Error"
                body={this.props.body}
            />
        );
    }
}

export default AuthErrorModal;