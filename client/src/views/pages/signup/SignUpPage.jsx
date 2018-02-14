import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { Actions as UserActions } from '../../../redux/modules/user/';
import './SignUpPage.css';
import PrimaryButton from '../../common/components/buttons/PrimaryButton';
import TextInput from '../../common/components/inputs/TextInput';
import { Actions as AlertActions } from '../../../redux/modules/alert';
import Container from '../../common/components/containers/Container';


class SignUpPage extends Component {

    constructor( props ) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''

        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange( e ) {
        this.setState({ [ e.target.name ]: e.target.value })
    }

    onSubmit( e ) {
        e.preventDefault();
        this.props.register(this.state.email, this.state.password, this.state.confirmPassword, this.state.firstName, this.state.lastName, this.state.phone);
    }

    renderError() {
        return (
            <p className={ "message " + this.props.alert.type }>{ this.props.alert.message }</p>
        )
    }

    componentWillUnmount() {
        this.props.clearAlert();
    }

    render() {
        return (
            <div id="signup-page">
                <div className="col-sm-12 col-md-4 col-md-offset-4 vertical-center">
                    <Container className="signup-container">

                        <form className="signup" onSubmit={ this.onSubmit }>
                            <h1 className="signup-title">Sign Up</h1>

                            {
                                !_.isEmpty(this.props.alert) && this.renderError()
                            }

                            <div className="form-group">
                                <TextInput
                                    value={ this.state.firstName }
                                    onChange={ this.onChange }
                                    name="firstName"
                                    placeholder="First Name"
                                />

                                <TextInput
                                    value={ this.state.lastName }
                                    onChange={ this.onChange }
                                    name="lastName"
                                    placeholder="Last Name"
                                />

                                <TextInput
                                    value={ this.state.email }
                                    onChange={ this.onChange }
                                    name="email"
                                    placeholder="Email"
                                />

                                <TextInput
                                    value={ this.state.phone }
                                    onChange={ this.onChange }
                                    type="number"
                                    name="phone"
                                    className="phone"
                                    placeholder="Phone Number"
                                />

                                <TextInput
                                    value={ this.state.password }
                                    onChange={ this.onChange }
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                />

                                <TextInput
                                    value={ this.state.confirmPassword }
                                    onChange={ this.onChange }
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                />
                            </div>

                            <div className="btn-group" id="button">
                                <PrimaryButton text="Register"/>
                            </div>

                        </form>
                    </Container>
                </div>
            </div>
        );
    }
}

SignUpPage.propTypes = {
    register: PropTypes.func,
    clearAlert: PropTypes.func,
    alert: PropTypes.object
};

export default connect(
    state => ( {
        userData: state.user.data,
        alert: state.alert
    } ),
    dispatch => ( {
        register: bindActionCreators(UserActions.register, dispatch),
        clearAlert: bindActionCreators(AlertActions.clear, dispatch)
    } )
)(SignUpPage);
