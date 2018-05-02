import React, { Component } from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../common/components/buttons/PrimaryButton';
import TextInput from '../../common/components/inputs/TextInput';
import { Actions as UserActions } from '../../../redux/modules/user';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import Container from '../../common/components/containers/Container';
import { toast } from 'react-toastify';

/**
 * Creates Login Page
 */
class LoginPage extends Component {
    constructor( props ) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onFailed = this.onFailed.bind(this);
    }

    onChange( e ) {
        this.setState({ [ e.target.name ]: e.target.value })
    }

    onSubmit( e ) {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password, this.onSuccess, this.onFailed);
    }

    onFailed() {
        toast.error('The username or password you entered was incorrect.', {
            position: toast.POSITION.TOP_CENTER
        });
    }

    onSuccess(data) {
        UserActions.navigateToRoleIndex(data.role, this.props.history);
        toast.success('You have logged in.', {
            position: toast.POSITION.TOP_CENTER
        });
    }

    render() {
        return (
            <div id="login-page">
                <div className="col-sm-12 col-md-4 col-md-offset-4 vertical-center">
                    <Container className="login-container">

                        <form className="login" onSubmit={ this.onSubmit }>
                            <h1 className="login-title">Log in</h1>

                            <div id="login-form" className="form-group">
                                <TextInput
                                    value={ this.state.email }
                                    onChange={ this.onChange }
                                    name="email"
                                    placeholder="Email"
                                />
                                <TextInput
                                    value={ this.state.password }
                                    onChange={ this.onChange }
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                />

                                <p>Don't have an account? <Link to="/signup">Register Your Business.</Link></p>

                            </div>


                            <div className="btn-group" id="button">
                                <PrimaryButton text="Login" />
                            </div>

                        </form>
                    </Container>
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    /**
     * Login function
     */
    login: PropTypes.func,
    /**
     * History data
     */
    history: PropTypes.any
};

export default connect(
    store => ( {
    } ),
    dispatch => ( {
        login: bindActionCreators(UserActions.login, dispatch)
    } )
)(LoginPage);
