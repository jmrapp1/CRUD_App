import React, { Component } from 'react';
import './LoginPage.css';
import Container from '../../common/components/containers/Container';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
    render() {
        return (
            <div className="app container-fluid">
                <Container>
                    <h1>This is the Login</h1>
                    <h1><Link to="/">Home</Link></h1>
                </Container>
            </div>

        );
    }
}

export default LoginPage;
