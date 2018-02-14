import React, { Component } from 'react';
import './Customer.css';
import Container from '../../../common/components/containers/Container';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class Customer extends Component {
    render() {
        return (
            <div id="customer-home">
                <div className="col-sm-12 col-md-8 col-md-offset-2 vertical-center">
                    <Container className="container">
                        <h1>Welcome { this.props.user.firstName } { this.props.user.lastName }. You're a customer!</h1>
                    </Container>
                </div>
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
    } )
)(Customer);
