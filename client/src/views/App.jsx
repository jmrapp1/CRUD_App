import React, { Component } from 'react';
import './App.css';
import Container from './common/components/containers/Container';
import Login from "./pages/login/Login";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

class App extends Component {
    render() {
        return (
            <div className="app container-fluid">
               <div className="row">
                   <Header />
               </div>
                <div className="row">
                    <Content />
                </div>
                <div className="row">
                    <Footer />
                </div>
            </div>

        );
    }
}

export default App;
