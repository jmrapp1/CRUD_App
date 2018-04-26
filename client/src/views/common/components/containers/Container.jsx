import React from 'react';
import PropTypes from 'prop-types';
import './Container.css';

/**
 * Creates Container Components
 * @param children
 * @param padding
 * @param className
 * @param shadow
 * @param round
 * @returns {*}
 * @constructor
 */
const Container = ({ children, padding = 30, className = '', shadow = true, round = true }) => (
    <div className={ 'Container ' + className + (shadow ? " container-shadow" : "") + (round ? " container-round" : "") } style={ { padding } }>
        { children }
    </div>
);

/**
 * Declare prop-Types
 * @type {{children: shim, padding: shim, className: shim, shadow: shim, round: shim}}
 */
Container.propTypes = {
    /**
     * Child Node
     */
    children: PropTypes.node,
    /**
     * Container's Padding
     */
    padding: PropTypes.number,
    /**
     * Container's Class Name
     */
    className: PropTypes.string,
    /**
     * Container's Shadow
     */
    shadow: PropTypes.bool,
    /**
     * Is the Container's edge rounded or not
     */
    round: PropTypes.bool
};

export default Container;