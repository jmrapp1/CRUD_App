import React, { Component } from 'react';
import './App.css';
import Container from './common/components/containers/Container';

class App extends Component {
    render() {
        return (
            <div className="app container-fluid">
                <Container>
                    <h1>Our App Testing</h1>
                </Container>
            </div>
        );
    }
}

export default App;
