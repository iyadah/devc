import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import {login} from '../../actions/auth';

export const Login = ({ login, isAuthenticate }) => {
    const [ formData, setFormData ] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const onChange = e => 
      setFormData({ ...formData, [ e.target.name ]: e.target.value});

    const onSubmit = async e =>{
        e.preventDefault();
        login(email, password);
    }

    //Redirect if logged in
    if(isAuthenticate){
        return <Redirect to="/dashboard" />;
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Login to your account</p>
            <form className="form" onSubmit={ e => onSubmit(e)}>
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value = {password}
                    onChange={e => onChange(e)}
                    required
                    minLength="6"
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                You don't have an account? <Link to="/register">Sign Up</Link>
            </p>

        </Fragment>
    )
}
Login.propTypes = {
    login:PropTypes.func.isRequired,
    isAuthenticate: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticate: state.auth.isAuthenticate
});

export default connect(mapStateToProps, { login })(Login);

