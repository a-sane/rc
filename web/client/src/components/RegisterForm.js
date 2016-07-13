import React, { PropTypes } from 'react';
import {reduxForm} from 'redux-form';

const RegisterForm = ({ handleSubmit, fields: {firstname, lastname, username, password } }) => {
    return (
    <form onSubmit={handleSubmit}>
        <div>
            <span>First Name</span>
            <input type="text" {...firstname} required="required" />
        </div>
        <div>
            <span>Last Name</span>
            <input type="text" {...lastname} required="required" />
        </div>
        <div>
            <span>Email</span>
            <input type="email" {...username} required="required" />
        </div>
        <div>
            <span>Password</span>
            <input type="password" {...password} required="required" />
        </div>
        <input type="submit" value="Register"/>
    </form>
    );
};

RegisterForm.propTypes = {
    handleSubmit: PropTypes.func,
    fields: PropTypes.object
};

export default reduxForm({
    form: 'register',
    fields: ['firstname', 'lastname', 'username', 'password']
})(RegisterForm);