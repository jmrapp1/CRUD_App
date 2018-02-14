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

                            <Link to="/"><img className ="img" src={image} /></Link>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkNavItem href="#">
                                About
                            </LinkNavItem>
                            <NavDropdown title="Employee" id="basic-nav-dropdown">
                                <MenuItem href="#">Manage</MenuItem>
                                <MenuItem href="#">New</MenuItem>
                            </NavDropdown>
                            <LinkNavItem href="#">
                                Store
                            </LinkNavItem>
                        </Nav>
                        <Nav pullRight>
                            <LinkNavItem href="/login">
                                Login
                            </LinkNavItem>
                            <LinkNavItem href="/signup">
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
