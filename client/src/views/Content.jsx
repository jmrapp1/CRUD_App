import React, { Component } from 'react';
import './Content.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';


class Content extends Component {
    render() {
        return (
            <div className="container-fluid">
                <h1>Content</h1>
                <Switch>
                    <Route exact path="/login" component={ LoginPage }/>
                    <Route path="/*" component={ HomePage }/>
                </Switch>
            </div>
        );
    }
}

export default Content;
