import React, { PropTypes } from 'react';
import {reduxForm} from 'redux-form';

const LoginForm = ({ handleSubmit, fields: { username, password } }) => {
    return (
    <form onSubmit={handleSubmit}>
        <div>
            <span>Email</span>
            <input type="email" {...username} required="required" />
        </div>
        <div>
            <span>Password</span>
            <input type="password" {...password} required="required" />
        </div>
        <input type="submit" value="Login"/>
    </form>
    );
};

LoginForm.propTypes = {
    handleSubmit: PropTypes.func,
    fields: PropTypes.object
};

export default reduxForm({
    form: 'login',
    fields: ['username', 'password']
})(LoginForm);