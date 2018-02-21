import React, { Component } from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../common/components/buttons/PrimaryButton';
import TextInput from '../../common/components/inputs/TextInput';
import { Actions as UserActions } from '../../../redux/modules/user';
import { Actions as AlertActions } from '../../../redux/modules/alert';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import Container from '../../common/components/containers/Container';

class LoginPage extends Component {
    constructor( props ) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
        this.props.clearAlert();

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
    }

    onChange( e ) {
        this.setState({ [ e.target.name ]: e.target.value })
    }

    onSubmit( e ) {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password, this.onSuccess);
    }

    onSuccess(data) {
        UserActions.navigateToRoleIndex(data.role, this.props.history);
    }

    renderError() {
        return (
            <p className={ "alert " + this.props.alert.type }>{ this.props.alert.message }</p>
        )
    }

    componentWillUnmount() {
        this.props.clearAlert();
    }

    render() {
        return (
            <div id="login-page">
                <div className="col-sm-12 col-md-4 col-md-offset-4 vertical-center">
                    <Container className="login-container">

                        <form className="login" onSubmit={ this.onSubmit }>
                            <h1 className="login-title">Log in</h1>

                            {
                                !_.isEmpty(this.props.alert) && this.renderError()
                            }
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

                                <p>Don't have an account? <Link to="/signup">Register.</Link></p>

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
    login: PropTypes.func,
    clearAlert: PropTypes.func,
    alert: PropTypes.object,
    history: PropTypes.any
};

export default connect(
    store => ( {
        alert: store.alert
    } ),
    dispatch => ( {
        login: bindActionCreators(UserActions.login, dispatch),
        clearAlert: bindActionCreators(AlertActions.clear, dispatch)
    } )
)(LoginPage);
