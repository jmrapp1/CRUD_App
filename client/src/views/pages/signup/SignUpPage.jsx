import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { Actions as BusinessActions } from '../../../redux/modules/business/';
import './SignUpPage.css';
import PrimaryButton from '../../common/components/buttons/PrimaryButton';
import TextInput from '../../common/components/inputs/TextInput';
import Container from '../../common/components/containers/Container';
import { toast } from 'react-toastify';


class SignUpPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            street: '',
            city: '',
            zipcode: '',
            state: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            rate: '',
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
        this.onRegisterSuccess = this.onRegisterSuccess.bind(this);
        this.onRegisterError = this.onRegisterError.bind(this);
    }

    onRegisterSuccess(message) {
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER
        });
        this.props.history.push('/');
    }

    onRegisterError(error) {
        toast.error(error, {
            position: toast.POSITION.TOP_CENTER
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onChangeSchedule(e) {
        if (e.target.value === 'Working') this.setState({ [e.target.name]: true });
        else this.setState({ [e.target.name]: false });
    }

    onSubmit() {
        this.props.register(this.state.email, this.state.password, this.state.confirmPassword, this.state.firstName, this.state.lastName, this.state.phone,
            parseFloat(this.state.rate), this.state.mon, this.state.tue, this.state.wed, this.state.thur, this.state.fri, this.state.sat, this.state.sun,
            this.state.name, this.state.street, this.state.city, this.state.state, this.state.zipcode, this.onRegisterSuccess, this.onRegisterError);
    }

    render() {
        return (
            <div id="signup-page">
                <div className="content">
                    <div className="vertical-center">
                        <div className="row">
                            <div className="business col-sm-12 col-md-4 col-md-offset-1">
                                <Container className="business-container">
                                    <form className="business-form">
                                        <h1 className="business-title">Business Information</h1>

                                        <div className="form-group">
                                            <TextInput
                                                value={ this.state.name }
                                                onChange={ this.onChange }
                                                name="name"
                                                placeholder="Business Name"
                                            />
                                            <h2 className="address"><b>
                                                <ins>Address</ins>
                                            </b></h2>
                                            <TextInput
                                                value={ this.state.street }
                                                onChange={ this.onChange }
                                                name="street"
                                                placeholder="Street"
                                            />

                                            <TextInput
                                                value={ this.state.city }
                                                onChange={ this.onChange }
                                                name="city"
                                                placeholder="City"
                                            />

                                            <TextInput
                                                value={ this.state.zipcode }
                                                onChange={ this.onChange }
                                                name="zipcode"
                                                placeholder="Zip Code"
                                            />

                                            <TextInput
                                                value={ this.state.state }
                                                onChange={ this.onChange }
                                                name="state"
                                                placeholder="State"
                                            />
                                        </div>
                                    </form>
                                </Container>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <Container className="signup-container">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6">
                                            <form className="signup">
                                                <h1 className="signup-title">Manager Information</h1>

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
                                                        placeholder="Phone Number"
                                                    />

                                                    <TextInput
                                                        value={ this.state.rate }
                                                        onChange={ this.onChange }
                                                        type="number"
                                                        name="rate"
                                                        placeholder="Salary ($0.00)"
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

                                            </form>
                                        </div>
                                        <div className="col-sm-12 col-md-6">
                                            <form className="schedule">
                                                <h1 className="addemp-title">Manager Schedule</h1>

                                                <div className="form-group">
                                                    <p>
                                                        <ins>Monday</ins>
                                                    </p>
                                                    <select className="select" onChange={ this.onChangeSchedule }
                                                            name="mon">
                                                        <option value="Working">Working</option>
                                                        <option value="Off">Off</option>
                                                    </select>
                                                    <p>
                                                        <ins>Tuesday</ins>
                                                    </p>
                                                    <select className="select" onChange={ this.onChangeSchedule }
                                                            name="tue">
                                                        <option value="Working">Working</option>
                                                        <option value="Off">Off</option>
                                                    </select>
                                                    <p>
                                                        <ins>Wednesday</ins>
                                                    </p>
                                                    <select className="select" onChange={ this.onChangeSchedule }
                                                            name="wed">
                                                        <option value="Working">Working</option>
                                                        <option value="Off">Off</option>
                                                    </select>
                                                    <p>
                                                        <ins>Thursday</ins>
                                                    </p>
                                                    <select className="select" onChange={ this.onChangeSchedule }
                                                            name="thur">
                                                        <option value="Working">Working</option>
                                                        <option value="Off">Off</option>
                                                    </select>
                                                    <p>
                                                        <ins>Friday</ins>
                                                    </p>
                                                    <select className="select" onChange={ this.onChangeSchedule }
                                                            name="fri">
                                                        <option value="Working">Working</option>
                                                        <option value="Off">Off</option>
                                                    </select>
                                                    <p>
                                                        <ins>Saturday</ins>
                                                    </p>
                                                    <select className="select" onChange={ this.onChangeSchedule }
                                                            name="sat">
                                                        <option value="Working">Working</option>
                                                        <option value="Off">Off</option>
                                                    </select>
                                                    <p>
                                                        <ins>Sunday</ins>
                                                    </p>
                                                    <select className="select" onChange={ this.onChangeSchedule }
                                                            name="sun">
                                                        <option value="Working">Working</option>
                                                        <option value="Off">Off</option>
                                                    </select>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="btn-group" id="button">
                                        <PrimaryButton text="Register Business" onClick={ this.onSubmit }/>
                                    </div>
                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SignUpPage.propTypes = {
    register: PropTypes.func,
    history: PropTypes.any.isRequired
};

export default connect(
    state => ( {
        userData: state.user.data
    } ),
    dispatch => ( {
        register: bindActionCreators(BusinessActions.register, dispatch)
    } )
)(SignUpPage);
