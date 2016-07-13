import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {reduxForm} from 'redux-form';

import LoginForm from '../components/LoginForm';
import * as loginActions from '../actions/LoginActions'

class Login extends Component {

    handleSubmit(fields) {
            this.props.loginActions.login(fields);
    }

    render() {
        return (
            <div className="container">
                <div className="account">
                    <h1>Account</h1>
                    <div className="account-pass">
                        <div className="col-md-12 account-top">
                            <LoginForm onSubmit={::this.handleSubmit} />
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)