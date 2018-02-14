import React, { Component } from 'react';
import './Header.css';
import { Route, Switch } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { MenuItem, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import NavItem from 'react-bootstrap/es/NavItem';
import LinkNavItem from '../common/components/nav/LinkNavItem';

const image = require('../common/images/icon.png');


class Header extends Component {

    render() {
        return (
            <div id="header" className="row">
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">UManage</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkNavItem eventKey={ 2 } href="#">
                                About
                            </LinkNavItem>
                            <NavDropdown eventKey={ 3 } title="Dropdown" id="basic-nav-dropdown">
                                <MenuItem eventKey={ 3.1 } href="#">Manage</MenuItem>
                                <MenuItem eventKey={ 3.2 } href="#">New</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <LinkNavItem eventKey={ 1 } href="/login">
                                Login
                            </LinkNavItem>
                            <LinkNavItem eventKey={ 2 } href="/signup">
                                Register
                            </LinkNavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Header;
