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
                    <div className="col-md-6">
                        <div className="row">
                            <Container className="top" shadow={false} round={false}>Top</Container>
                        </div>

                        <div className="row">
                            <Container className="bottom" shadow={false} round={false}>Bottom</Container>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <Container className="right col-md-12" shadow={false} round={false}>Right</Container>
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