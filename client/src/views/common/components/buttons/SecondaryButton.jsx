import React from 'react';
import PropTypes from 'prop-types';
import './SecondaryButton.css';

/**
 * Creates the secondary button
 * @param text
 * @param onClick
 * @param className
 * @returns {*}
 * @constructor
 */
const SecondaryButton = ({ text, onClick, className }) => (
    <button className={ 'button button-secondary ' + className } onClick={ onClick }>{ text }</button>
);

/**
 * Declare prop-types
 * @type {{text: shim, onClick: shim, className: shim}}
 */
SecondaryButton.propTypes = {
    /**
     * Secondary Button's Text
     */
    text: PropTypes.node,
    /**
     * Function called when clicked
     */
    onClick: PropTypes.func,
    /**
     * Secondary Button's class Name
     */
    className: PropTypes.string
};

export default SecondaryButton;