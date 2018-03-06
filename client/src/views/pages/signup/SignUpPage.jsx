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
            name: '',
            street: '',
            city: '',
            zip: '',
            state: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            mon: true,
            tue: true,
            wed: true,
            thur: true,
            fri: true,
            sat: true,
            sun: true,
        };

        this.onChange = this.onChange.bind(this);
        this.onChangeSchedule = this.onChangeSchedule.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange( e ) {
        this.setState({ [ e.target.name ]: e.target.value })
    }

    onChangeSchedule(e) {
        if (e.target.value === 'Working') this.setState({ [e.target.name]: true });
        else this.setState({ [e.target.name]: false });
    }

    onSubmit( e ) {
        e.preventDefault();
        this.props.register(this.state.name, this.state.street, this.state.city, parseFloat(this.state.zip), this.state.zip,
        this.state.email, this.state.password, this.state.confirmPassword, this.state.firstName, this.state.lastName, this.state.phone,
        this.state.mon, this.state.tue, this.state.wed, this.state.thur, this.state.fri, this.state.sat, this.state.sun);
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
                <div className="vertical-center">

                    <div className="col-sm-12 col-md-4 ">
                        <Container className="business-container">
                            <form className="business-form">
                                <h1 className="business-title">Business</h1>

                                <div className="form-group">
                                    <TextInput
                                        value={ this.state.name }
                                        onChange = { this.onChange }
                                        name= "name"
                                        placeholder = "Business Name"
                                    />
                                <h2 className="address"><b><ins>Address</ins></b></h2>
                                    <TextInput
                                        value={ this.state.street }
                                        onChange = { this.onChange }
                                        name= "street"
                                        placeholder = "Street"
                                    />

                                    <TextInput
                                        value={ this.state.city }
                                        onChange = { this.onChange }
                                        name= "city"
                                        placeholder = "City"
                                    />

                                    <TextInput
                                        value={ this.state.zip }
                                        onChange = { this.onChange }
                                        type = "number"
                                        name= "zip"
                                        placeholder = "Zip Code"
                                    />

                                    <TextInput
                                        value={ this.state.zip}
                                        onChange = { this.onChange }
                                        name= "state"
                                        placeholder = "State"
                                    />
                                </div>
                            </form>
                        </Container>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <Container className="signup-container">
                            <form className="signup" onSubmit={ this.onSubmit }>
                                <h1 className="signup-title">Manager Register</h1>

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

                    <div className="col-sm-2 col-md-4">
                        <Container className="schedule-container">

                            <form className="schedule">
                                <h1 className="addemp-title">Schedule</h1>

                                <div className="form-group">
                                    <p>
                                        <ins>Monday</ins>
                                    </p>
                                    <select className="select" onChange={ this.onChangeSchedule } name="mon">
                                        <option value="Working">Working</option>
                                        <option value="Off">Off</option>
                                    </select>
                                    <p>
                                        <ins>Tuesday</ins>
                                    </p>
                                    <select className="select" onChange={ this.onChangeSchedule } name="tue">
                                        <option value="Working">Working</option>
                                        <option value="Off">Off</option>
                                    </select>
                                    <p>
                                        <ins>Wednesday</ins>
                                    </p>
                                    <select className="select" onChange={ this.onChangeSchedule } name="wed">
                                        <option value="Working">Working</option>
                                        <option value="Off">Off</option>
                                    </select>
                                    <p>
                                        <ins>Thursday</ins>
                                    </p>
                                    <select className="select" onChange={ this.onChangeSchedule } name="thur">
                                        <option value="Working">Working</option>
                                        <option value="Off">Off</option>
                                    </select>
                                    <p>
                                        <ins>Friday</ins>
                                    </p>
                                    <select className="select" onChange={ this.onChangeSchedule } name="fri">
                                        <option value="Working">Working</option>
                                        <option value="Off">Off</option>
                                    </select>
                                    <p>
                                        <ins>Saturday</ins>
                                    </p>
                                    <select className="select" onChange={ this.onChangeSchedule } name="sat">
                                        <option value="Working">Working</option>
                                        <option value="Off">Off</option>
                                    </select>
                                    <p>
                                        <ins>Sunday</ins>
                                    </p>
                                    <select className="select" onChange={ this.onChangeSchedule } name="sun">
                                        <option value="Working">Working</option>
                                        <option value="Off">Off</option>
                                    </select>
                                </div>
                            </form>
                        </Container>
                    </div>
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
