import React from "react";
import { Route } from "react-router-dom";
import { NavItem } from "react-bootstrap";
import PropTypes from 'prop-types';

/**
 * Creates a LinkNavItem when clicked brings you to the employee page
 * @param props
 * @returns {*}
 * @constructor
 */
const LinkNavItem = props => (

    <Route
        path={ props.href }
        exact
        children={ ({ match, history }) =>
            <NavItem
                onClick={ e => history.push(e.currentTarget.getAttribute("href")) }
                { ...props }
                active={ !!match }
            >
                { props.children }
            </NavItem>
        }
    />
);

/**
 *
 * @type {{children: shim, href: shim}}
 */
LinkNavItem.propTypes = {
    /**
     * The employee root
     */
    children: PropTypes.node,
    /**
     * Link to the employee page
     */
    href: PropTypes.string
};

export default LinkNavItem;
