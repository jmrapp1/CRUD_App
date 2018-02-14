import React, { Component } from 'react';
import './Content.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../pages/login/LoginPage';
import HomePage from '../pages/home/HomePage';
import SignUpPage from "../pages/signup/SignUpPage";
import Customer from "../pages/index/customer/Customer";
import Employee from "../pages/index/employee/Employee";
import Manager from "../pages/index/manager/Manager";


class Content extends Component {
    render() {
        return (
            <div id="content">
                <Switch>
                    <Route exact path="/login" component={ LoginPage }/>
                    <Route exact path="/signup" component={ SignUpPage }/>
                    <Route exact path="/customer" component={ Customer }/>
                    <Route exact path="/employee" component={ Employee }/>
                    <Route exact path="/manager" component={ Manager }/>

                    <Route path="/*" component={ HomePage }/>
                </Switch>
            </div>
        );
    }
}

export default Content;
