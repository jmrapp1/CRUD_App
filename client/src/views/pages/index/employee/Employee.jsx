import React, { Component } from 'react';
import './Employee.css';
import Container from '../../../common/components/containers/Container';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Employee extends Component {
    render() {
        return (
            <div id="employee-home">
                <div className="row">
                    <div className="info col-sm-12 col-md-4 col-md-offset-6 text-right">
                        <Container className="container col-md-4 .ml-auto">
                            <u1>
                                    <p>Fist Name: {this.props.user.firstName}</p>
                                    <p>Last Name: {this.props.user.lastName}</p>
                                    <p>Email: {this.props.user.email}</p>
                                    <p>Rate: $24.25</p>

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