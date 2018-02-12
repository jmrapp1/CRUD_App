import React, { Component } from 'react';
import './Customer.css';
import Container from '../../../common/components/containers/Container';
import { Link } from 'react-router-dom';

class Customer extends Component {
    render() {
        return (
            <div className="app container-fluid">
                <Container>
                    <h1>You Have Signed In As A Customer</h1>
                    <h1><Link to="/login">Return to Login</Link></h1>
                </Container>
            </div>

        );
    }
}

export default Customer;
