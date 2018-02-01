import React, { Component } from 'react';
import './HomePage.css';
import Container from '../../common/components/containers/Container';

class HomePage extends Component {
    render() {
        return (
            <div className="app container-fluid">
                <Container>
                    <h1>This is the Home Page</h1>
                </Container>
            </div>

        );
    }
}

export default HomePage;
