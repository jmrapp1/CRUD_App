import React, { Component } from 'react';
import './Header.css';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';
import { MenuItem, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import NavItem from 'react-bootstrap/es/NavItem';
import LinkNavItem from '../common/components/nav/LinkNavItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions as UserActions } from '../../redux/modules/user';

const image = require('../common/images/icon.png');


class Header extends Component {

    constructor( props ) {
        super(props);
        this.doLogout = this.doLogout.bind(this);
    }

    doLogout() {
        this.props.logout();
        this.props.history.push('/');
    }

    render() {
        return (
            <div id="header" className="row">
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>

                            <Link to="/"><img className="img" src={ image }/></Link>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkNavItem href="#">
                                About
                            </LinkNavItem>
                            <NavDropdown title="Employee" id="basic-nav-dropdown">
                                <MenuItem href="#/manage">Manage</MenuItem>
                                <MenuItem href="#/addemployee">New</MenuItem>
                            </NavDropdown>
                            <NavDropdown title="Customer" id="basic-nav-dropdown">
                                <MenuItem href="#/manageCustomers">Manage</MenuItem>
                            </NavDropdown>
                            <LinkNavItem href="#">
                                Store
                            </LinkNavItem>
                        </Nav>

                            { this.props.loggedIn ? (
                                    <Nav pullRight>
                                        <NavItem onClick={ this.doLogout }>
                                            Logout
                                        </NavItem>
                                    </Nav>
                                )
                                :
                                (
                                    <Nav pullRight>
                                        <LinkNavItem href="/login">
                                            Login
                                        </LinkNavItem>
                                        < LinkNavItem href="/signup">
                                            Register
                                        </LinkNavItem>
                                    </Nav>
                                )
                            }
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

Header.propTypes = {
    loggedIn: PropTypes.bool,
    logout: PropTypes.func,
    history: PropTypes.any
};

export default connect(
    store => ( {
        loggedIn: store.user.loggedIn
    } ),
    dispatch => ( {
        logout: bindActionCreators(UserActions.logout, dispatch)
    } )
)(Header);
