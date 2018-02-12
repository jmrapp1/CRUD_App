import React, { Component } from 'react';
import './Header.css';
import { Route, Switch } from 'react-router-dom';

import { Link } from 'react-router-dom';

const image = require('./common/image/icon.png');


class Header extends Component {

    render() {
        return (
            <div id="header">
                <div className="container-fluid">
                    <div className="col-sm-4 col-md-4 col-md-offset-4 text-center" id="image-header">
                        <nav className="navbar navbar-default">
                            <div className="navbar-header">
                                <Link className="navbar-brand" to="/">Home</Link>
                            </div>
                            <div className="container-fluid">
                                <ul className="nav navbar-nav">
                                    <li className="dropdown">
                                        <Link className="dropdown-toggle" data-toggle="collapse" to="#">Employee
                                            <span className="caret"></span></Link>
                                        <ul className="dropdown-menu" role="menu">
                                            <li><Link to="/">Add Employee</Link></li>
                                            <li><Link to="/">Manage Employee</Link></li>
                                        </ul>
                                    </li>

                                    <li><Link to="/shop">Shop</Link></li>
                                    <li><Link to="/login">Login</Link></li>
                                    <li><Link to="/signup">Sign Up</Link></li>
                                </ul>

                            </div>
                        </nav>

                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
