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
import { toast } from 'react-toastify';
import { UserRoles } from '../../redux/UserRoles';

const image = require('../common/images/icon.png');

/**
 * Create the main header
 */
class Header extends Component {

    constructor( props ) {
        super(props);
        this.doLogout = this.doLogout.bind(this);
    }

    doLogout() {
        this.props.logout();
        this.props.history.push('/');
        toast.info('You have logged out.', {
            position: toast.POSITION.TOP_CENTER
        });
    }

    renderManagerView() {
        if (this.props.user.role === UserRoles.MANAGER) {
            return (
                <NavDropdown title="Employee" id="basic-nav-dropdown">
                    <MenuItem href="#/manage">Manage</MenuItem>
                    <MenuItem href="#/addemployee">New</MenuItem>
                </NavDropdown>
            );
        }
    }

    renderEmployeeView() {
        console.log(this.props.user);
        if (this.props.user.role === UserRoles.MANAGER || this.props.user.role === UserRoles.EMPLOYEE) {
            return (
                <NavDropdown title="Customer" id="basic-nav-dropdown">
                    <MenuItem href="#/manageCustomers">Manage</MenuItem>
                </NavDropdown>
            );
        }
    }

    renderLoggedInView() {
        if (this.props.loggedIn) {
            return (
                <Nav pullRight>
                    <NavItem onClick={ this.doLogout }>
                        Logout
                    </NavItem>
                </Nav>
            );
        }
        return (
            <Nav pullRight>
                <LinkNavItem href="/login">
                    Login
                </LinkNavItem>
                < LinkNavItem href="/signup">
                    Register
                </LinkNavItem>
            </Nav>
        );
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
                            <LinkNavItem href="/about">
                                About
                            </LinkNavItem>
                            { this.renderManagerView() }
                            { this.renderEmployeeView() }
                        </Nav>
                        { this.renderLoggedInView() }
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

/**
 * Declare prop types
 * @type {{loggedIn: shim, logout: shim, history: shim, user: shim}}
 */
Header.propTypes = {
    /**
     * See's if the user is logged in
     */
    loggedIn: PropTypes.bool,
    /**
     * Loggin out function
     */
    logout: PropTypes.func,
    /**
     * Previous history
     */
    history: PropTypes.any,
    /**
     * User date
     */
    user: PropTypes.node
};

export default connect(
    store => ( {
        user: store.user.user,
        loggedIn: store.user.loggedIn
    } ),
    dispatch => ( {
        logout: bindActionCreators(UserActions.logout, dispatch)
    } )
)(Header);
