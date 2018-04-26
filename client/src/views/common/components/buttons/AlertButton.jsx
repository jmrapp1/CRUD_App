import React from 'react';
import PropTypes from 'prop-types';
import './AlertButton.css';


/**
 * Creates the alert button
 * @param text
 * @param onClick
 * @param className
 * @returns {*}
 * @constructor
 */
const AlertButton = ({ text, onClick, className }) => (
    <button className={ 'button button-alert ' + className } onClick={ onClick }>{ text }</button>
);

/**
 *
 * @type {{text: shim, onClick: shim, className: shim}}
 */
AlertButton.propTypes = {
    /**
     * Alert message
     */
    text: PropTypes.node,
    /**
     * Function called when clilcked
     */
    onClick: PropTypes.func,
    /**
     * Class Name
     */
    className: PropTypes.string
};

export default AlertButton;