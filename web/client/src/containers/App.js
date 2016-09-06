import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from "./Header"
import Footer from "../components/Footer"
import AuthErrorModal from "../components/AuthErrorModal"
import {modalHide} from "../actions/ModalActions"

class App extends Component {
    render() {
        return (
            <div className='wrapper'>
                <AuthErrorModal show={this.props.modal.show} body={this.props.modal.body} closeAction={this.props.closeAction} />
                <Header />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        modal: state.modal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        closeAction: bindActionCreators(modalHide, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)