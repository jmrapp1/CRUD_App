import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { Actions as EmployeeActions } from '../../../../redux/modules/employee/';
import './AddEmployee.css';
import PrimaryButton from '../../../common/components/buttons/PrimaryButton';
import TextInput from '../../../common/components/inputs/TextInput';
import Container from '../../../common/components/containers/Container';
import { toast } from 'react-toastify';


class AddEmployee extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            rate: '0.00',
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

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onChangeSchedule(e) {
        if (e.target.value === 'Working') this.setState({ [e.target.name]: true });
        else this.setState({ [e.target.name]: false });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.register(this.state.email, this.state.password, this.state.confirmPassword, this.state.firstName, this.state.lastName, this.state.phone,
            parseFloat(this.state.rate), this.state.mon, this.state.tue, this.state.wed, this.state.thur, this.state.fri, this.state.sat, this.state.sun,
            this.onRegisterSuccess, this.onRegisterError);
    }

    onRegisterSuccess(message) {
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER
        });
        this.props.history.push('/manage');
    }

    onRegisterError(error) {
        toast.error(error, {
            position: toast.POSITION.TOP_CENTER
        });
    }

    render() {
        return (
            <div id="addemp-page">
                <div className="vertical-center">
                    <div className="col-sm-2 col-md-4 col-md-offset-2">
                        <Container className="addemp-container">
                            <form className="addemp" onSubmit={ this.onSubmit }>
                                <h1 className="addemp-title">Add Employee</h1>

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
                                        value={ this.state.rate }
                                        onChange={ this.onChange }
                                        type="number"
                                        name="rate"
                                        className="rate"
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

                                <div className="btn-group" id="button">
                                    <PrimaryButton text="Register"/>
                                </div>

                            </form>
                        </Container>

                    </div>

                    <div className="col-sm-2 col-md-4">
                        <Container className="schedule-container">

                            <form className="addemp">
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

AddEmployee.propTypes = {
    register: PropTypes.func,
    history: PropTypes.any.isRequired
};

export default connect(
    state => ( {
    } ),
    dispatch => ( {
        register: bindActionCreators(EmployeeActions.register, dispatch)
    } )
)(AddEmployee);