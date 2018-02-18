import React, { Component } from 'react';
import './Employee.css';
import Container from '../../../common/components/containers/Container';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const image = require('../../../common/images/pfp.jpg');
class Employee extends Component {
    render() {
        return (
            <div id="employee-home">
                <div className="row">
                    <div className="col-md-4 col-md-offset-2">
                        <div className="row">
                            <Container className="top col-md-6 col-md-offset-4" shadow={false} round={false}>
                                <img src={image} height="175px" width="240px"/>

                            </Container>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <Container className="right col-md-12" shadow={false} round={false}>
                            <h1><ins>Employee Information</ins></h1>
                            <u1 className="employee">
                                <p>Fist Name: {this.props.user.firstName}</p>
                                <p>Last Name: {this.props.user.lastName}</p>
                                <p>Email: {this.props.user.email}</p>
                                <p>Phone Number: {this.props.user.phone}</p>
                                <p>Rate: $24.25</p>
                            </u1>
                        </Container>
                    </div>

                    <div className="col-md-8">
                        <Container className="bottom col-md-12 col-md-offset-4" shadow={false} round={false}>
                            <h1><ins>Schedule</ins></h1>
                            <u1 className="schedule">
                                <p><b>Monday: </b> <b>Tuesday: </b> <b>Wednesday: </b> <b>Thursday: </b><b>Friday: </b>
                                <b>Saturday: </b><b>Sunday: </b></p>
                            </u1>
                        </Container>
                    </div>
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