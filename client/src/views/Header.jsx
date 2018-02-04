import React, { Component } from 'react';
import './Header.css';
import { Route, Switch } from 'react-router-dom';


class Header extends Component {

    render() {
        return (
            <div className="container-fluid">
                <Switch>
                    <Route exact path="/login" component={ () => <h1></h1> }/>
                    <Route path="/*" component={ () => <h1></h1> }/>
                </Switch>
            </div>
        );
    }
}

export default Header;
