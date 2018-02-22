import React, { Component } from 'react';
import './Employee.css';
import Container from '../../../common/components/containers/Container';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'jquery-match-height';
import * as $ from 'jquery';


const image = require('../../../common/images/pfp.jpg');

class Employee extends Component {

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

    render() {
        return (
            <div id="employee-home">
                <div className="containers row">
                    <div className="content col-md-4 col-md-offset-2">
                        <div className="row">
                            <Container className="employee-image text-center" shadow={ false } round={ false }>
                                <img src={ image } className="img-responsive text-center"/>
                            </Container>
                        </div>
                        <div className="row">
                            <Container className="employee-schedule" shadow={ false } round={ false }>
                                <h1>Schedule</h1>
                                <ul>
                                    <li><b>Monday:</b> { this.renderWorking(this.props.user.profile.daysWorking.monday) }</li>
                                    <li><b>Tuesday:</b> { this.renderWorking(this.props.user.profile.daysWorking.tuesday) }</li>
                                    <li><b>Wednesday:</b> { this.renderWorking(this.props.user.profile.daysWorking.wednesday) }</li>
                                    <li><b>Thursday:</b> { this.renderWorking(this.props.user.profile.daysWorking.thursday) }</li>
                                    <li><b>Friday:</b> { this.renderWorking(this.props.user.profile.daysWorking.friday) }</li>
                                    <li><b>Saturday:</b> { this.renderWorking(this.props.user.profile.daysWorking.saturday) }</li>
                                    <li><b>Sunday:</b> { this.renderWorking(this.props.user.profile.daysWorking.sunday) }</li>
                                </ul>
                            </Container>
                        </div>
                    </div>
                    { this.renderResponseInfo((
                            <Container className="employee-info" shadow={ false } round={ false }>
                                <h1>Employee Information</h1>
                                <ul className="employee">
                                    <li>Fist Name: { this.props.user.firstName }</li>
                                    <li>Last Name: { this.props.user.lastName }</li>
                                    <li>Email: { this.props.user.email }</li>
                                    <li>Phone Number: { this.props.user.phone }</li>
                                    <li>Rate: { this.props.user.profile.payRate }</li>
                                </ul>
                            </Container>
                        )
                    ) }
                </div>
            </div>
        );
    }
}

Employee.propTypes = {
    user: PropTypes.object,
};

export default connect(
    store => ( {
        user: store.user.user
    } )
)(Employee);