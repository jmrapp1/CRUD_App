import React, { Component } from 'react';
import './Employee.css';
import Container from '../../../common/components/containers/Container';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'jquery-match-height';
import * as $ from 'jquery';
import * as _ from 'lodash';
import PrimaryButton from "../../../common/components/buttons/PrimaryButton";
import TextInput from "../../../common/components/inputs/TextInput";


const image = require('../../../common/images/pfp2.jpg');

var count = 0;

class Employee extends Component {
    constructor(props) {
        super(props);
        this.employee = this.props.employee;
        if (this.props.location && this.props.location.employee) {
            this.employee = this.props.location.employee;
        }
        this.state = {
            firstName: this.employee.firstName,
            lastName: this.employee.lastName,
            email: this.employee.email,
            phone: this.employee.phone,
            rate: 'Salary ($' + this.employee.profile.payRate + ')'
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        $('.content').matchHeight(false);
    }

    renderResponseInfo(content) {
        return (
            <div>
                <div className="content col-md-4 hidden-sm-down">
                    { content }
                </div>
                { /*<div className="col-md-4 hidden-md-up">
                    { content }
                </div>*/ }
            </div>
        );
    }

    renderWorking(working) {
        return working ? 'Working' : 'Off';
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onClick(e) {
        var info = document.getElementById("info");
        var edit = document.getElementById("edit");
        if (count == 0) {
            info.style.display = 'none';
            edit.style.display = 'block';
            count = 1;
        }
        else {
            info.style.display = 'block';
            edit.style.display = 'none';
            count = 0;
        }
    }

    render() {
        return (
            <div id="employee-home">

                <div className="info" id="info">

                    <div className="row">
                        <div className="business-container col-md-4 col-md-offset-4">
                            <Container className="busi-cont">
                                <h1>{ this.employee.business.name }</h1>
                            </Container>
                        </div>
                    </div>

                    <div className="row">
                        <div className="image-pfp col-md-4 col-md-offset-4">
                            <img src={ image } className="img-pfp img-responsive text-center"/>
                        </div>
                    </div>
                    <div className="containers row">
                        <div className="content col-md-4 col-md-offset-2">
                            <div className="row">
                                <Container className="employee-schedule" shadow={ false } round={ false }>
                                    <h1>Schedule</h1>
                                    <ul className="schedule">
                                        <li>
                                            <b>Monday:</b> { this.renderWorking(this.employee.profile.daysWorking.monday) }
                                        </li>
                                        <li>
                                            <b>Tuesday:</b> { this.renderWorking(this.employee.profile.daysWorking.tuesday) }
                                        </li>
                                        <li>
                                            <b>Wednesday:</b> { this.renderWorking(this.employee.profile.daysWorking.wednesday) }
                                        </li>
                                        <li>
                                            <b>Thursday:</b> { this.renderWorking(this.employee.profile.daysWorking.thursday) }
                                        </li>
                                        <li>
                                            <b>Friday:</b> { this.renderWorking(this.employee.profile.daysWorking.friday) }
                                        </li>
                                        <li>
                                            <b>Saturday:</b> { this.renderWorking(this.employee.profile.daysWorking.saturday) }
                                        </li>
                                        <li>
                                            <b>Sunday:</b> { this.renderWorking(this.employee.profile.daysWorking.sunday) }
                                        </li>
                                    </ul>
                                </Container>
                            </div>
                        </div>


                        { this.renderResponseInfo((
                                <Container className="employee-info" shadow={ false } round={ false }>
                                    <h1>Employee Information</h1>
                                    <ul className="employee">
                                        <li><b>Fist Name:</b> { this.employee.firstName }</li>
                                        <li><b>Last Name:</b> { this.employee.lastName }</li>
                                        <li><b>Email:</b> { this.employee.email }</li>
                                        <li><b>Phone Number:</b> { this.employee.phone }</li>
                                        <li><b>Rate:</b> { this.employee.profile.payRate }</li>
                                        <li><b>Business:</b> { this.employee.business.name }</li>
                                    </ul>
                                </Container>
                            )
                        ) }
                    </div>
                </div>

                <div className="row">
                    <div className="edit col-sm-4 col-md-4 col-md-offset-4 text-center" id="edit"
                         style={ { display: 'none' } }>
                        <Container className="edit-container">
                            <form className="edit-form" onSubmit={ this.onSubmit }>
                                <h1 className="edit-title">Edit Employee</h1>


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
                                </div>

                                <div className="btn-group" id="button">
                                    <PrimaryButton text="Confirm Change"/>
                                </div>

                            </form>
                        </Container>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 col-md-offset-4 text-center">
                        <div className="btn-group" id="button" onClick={ this.onClick }>
                            <PrimaryButton text="Edit Information"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Employee.propTypes = {
    employee: PropTypes.object.isRequired,
    location: PropTypes.object,
    alert: PropTypes.object
};

export default connect(
    store => ( {
        employee: store.user.user,
        alert: store.alert
    } )
)(Employee);