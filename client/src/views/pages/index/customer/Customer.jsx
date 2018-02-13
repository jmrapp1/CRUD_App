import React, { Component } from 'react';
import './Customer.css';
import Container from '../../../common/components/containers/Container';
import { Link } from 'react-router-dom';
import { Actions as UserActions } from '../../../../redux/modules/user';
import { Actions as AlertActions } from '../../../../redux/modules/alert';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class Customer extends Component {
    render() {
        return (
            <div className="app container-fluid">
                <Container>
                    <h1>Welcome {this.props.user.firstName} {this.props.user.lastName}</h1>
                    <h1><Link to="/login">Return to Login</Link></h1>
                </Container>
            </div>

        );
    }
}

Customer.propTypes = {
    user: PropTypes.object,
};

export default connect(
    store => ( {
        user: store.user.user
    } ),
    dispatch => ( {
        login: bindActionCreators(UserActions.login, dispatch),
        clearAlert: bindActionCreators(AlertActions.clear, dispatch)
    } )
)(Customer);
