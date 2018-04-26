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
     * 
     */
    text: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string
};

export default SecondaryButton;