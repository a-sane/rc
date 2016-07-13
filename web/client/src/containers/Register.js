import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {reduxForm} from 'redux-form';

import RegisterForm from '../components/RegisterForm';
import * as registerActions from '../actions/RegisterActions'

class Register extends Component {

    handleSubmit(fields) {
            this.props.registerActions.register(fields);
    }

    render() {
        return (
            <div className="container">
                <div className="account">
                    <h1>Register</h1>
                    <div className="account-pass">
                        <div className="col-md-12 account-top">
                            <RegisterForm onSubmit={::this.handleSubmit} />
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
        registerActions: bindActionCreators(registerActions, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register)