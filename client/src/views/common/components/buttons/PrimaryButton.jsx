import React from 'react';
import PropTypes from 'prop-types';
import './PrimaryButton.css';

/**
 * Creates the primary button
 * @param text
 * @param onClick
 * @param className
 * @returns {*}
 * @constructor
 */
const PrimaryButton = ({ text, onClick, className }) => (
    <button className={ 'button button-primary ' + className } onClick={ onClick }>{ text }</button>
);

PrimaryButton.propTypes = {
    /**
     * Primary Text
     */
    text: PropTypes.node,
    /**
     * Function called when clicked
     */
    onClick: PropTypes.func,
    /**
     * Class Name
     */
    className: PropTypes.string
};

export default PrimaryButton;