import React, { Component } from 'react';
import './Content.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';
import SignUpPage from "./pages/login/SignUpPage";


class Content extends Component {
    render() {
        return (
            <div className="container-fluid">
                <h1></h1>
                <Switch>
                    <Route exact path="/login" component={ LoginPage }/>
                    <Route exact path="/signup" component={ SignUpPage }/>
                    <Route path="/*" component={ HomePage }/>
                </Switch>
            </div>
        );
    }
}

export default Content;
