import React, { Component } from 'react';
import './App.css';
import Header from "./layout/Header";
import Content from "./layout/Content";

class App extends Component {
    render() {
        return (
            <div id="app" className="container-fluid">
                <Header/>
                <Content/>
            </div>
        );
    }
}

export default App;
