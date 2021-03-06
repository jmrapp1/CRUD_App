import React, { Component } from 'react';
import './Manager.css';
import Container from '../../../common/components/containers/Container';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'jquery-match-height';
import * as $ from 'jquery';
import { Actions as UserActions } from '../../../../redux/modules/user';
import { UserRoles } from '../../../../redux/UserRoles';

const image = require('../../../common/images/pfp.jpg');
const sales = require('../../../common/images/sales_temp.png');

/**
 * Creates Manager Landing Page
 */
class Manager extends Component {
    constructor( props ) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            rate: 'Salary ($0.00)'
        };

        UserActions.validateUserRole(this.props.user, UserRoles.MANAGER, this.props.history);

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
            </div>
        );
    }

    renderWorking(working) {
        return working ? 'Working' : 'Off';
    }

    onChange( e ) {
        this.setState({ [ e.target.name ]: e.target.value })
    }

    render() {
        if (this.props.loggedIn) {
            return (
                <div id="manager-home">
                    <div className="info" id="info">
                        <div className="row">
                            <div className="image-pfp col-md-4 col-md-offset-2">
                                <img src={ image } className="img-pfp img-responsive text-center"/>
                            </div>

                            <div className="business-container col-md-4">
                                <Container className="busi-cont">
                                    <h1>{ this.props.user.business.name }</h1>
                                    <ul className="business">
                                        <li><b>Street: </b> { this.props.user.business.street }</li>
                                        <li><b>City: </b> { this.props.user.business.city }</li>
                                        <li><b>Zip Code: </b> { this.props.user.business.zip }</li>
                                        <li><b>State: </b> { this.props.user.business.state }</li>
                                    </ul>
                                </Container>
                            </div>
                        </div>


                        <div className="containers row">
                            <div className="content col-md-4 col-md-offset-2">
                                <div className="row">
                                    <Container className="manager-schedule" shadow={ true } round={ true }>
                                        <h1>Schedule</h1>
                                        <ul className="schedule">
                                            <li>
                                                <b>Monday:</b> { this.renderWorking(this.props.user.profile.daysWorking.monday) }
                                            </li>
                                            <li>
                                                <b>Tuesday:</b> { this.renderWorking(this.props.user.profile.daysWorking.tuesday) }
                                            </li>
                                            <li>
                                                <b>Wednesday:</b> { this.renderWorking(this.props.user.profile.daysWorking.wednesday) }
                                            </li>
                                            <li>
                                                <b>Thursday:</b> { this.renderWorking(this.props.user.profile.daysWorking.thursday) }
                                            </li>
                                            <li>
                                                <b>Friday:</b> { this.renderWorking(this.props.user.profile.daysWorking.friday) }
                                            </li>
                                            <li>
                                                <b>Saturday:</b> { this.renderWorking(this.props.user.profile.daysWorking.saturday) }
                                            </li>
                                            <li>
                                                <b>Sunday:</b> { this.renderWorking(this.props.user.profile.daysWorking.sunday) }
                                            </li>
                                        </ul>
                                    </Container>
                                </div>
                            </div>


                            { this.renderResponseInfo((
                                    <Container className="manager-info" shadow={ true } round={ true }>
                                        <h1>Employee Information</h1>
                                        <ul className="manager">
                                            <li><b>Fist Name:</b> { this.props.user.firstName }</li>
                                            <li><b>Last Name:</b> { this.props.user.lastName }</li>
                                            <li><b>Email:</b> { this.props.user.email }</li>
                                            <li><b>Phone Number:</b> { this.props.user.phone }</li>
                                        </ul>
                                    </Container>
                                )
                            ) }
                        </div>
                    </div>

                    <div className="row">
                        <div className="sales col-md-4 col-md-offset-4 text-center">
                            <Container className="sales-cont">
                                <h1>Sales Chart</h1>
                                <img src={ sales } className="img-sales img-responsive text-center"/>
                            </Container>
                        </div>
                    </div>
                </div>
            );
        }
        return (<div></div>);
    }
}

Manager.propTypes = {
    /**
     * USer Data
     */
    user: PropTypes.object,
    /**
     * Checks if logged in
     */
    loggedIn: PropTypes.bool,
    /**
     * History data
     */
    history: PropTypes.object.isRequired
};

export default connect(
    store => ( {
        user: store.user.user,
        loggedIn: store.user.loggedIn
    } )
)(Manager);