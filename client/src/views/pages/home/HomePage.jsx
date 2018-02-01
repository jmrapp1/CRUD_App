import React, { Component } from 'react';
import './HomePage.css';
import Container from '../../common/components/containers/Container';
import { Link } from 'react-router-dom';

class HomePage extends Component {
    render() {
        return (
            <div className="app container-fluid">
                <Container>
                    <h1>This is the Home Page</h1>
                    <h1><Link to="/login">Login</Link></h1>
                </Container>
            </div>

        );
    }
}

export default HomePage;
