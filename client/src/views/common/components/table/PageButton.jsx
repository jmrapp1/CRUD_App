import React from 'react';
import PropTypes from 'prop-types';
import './PageButton.css';

/**
 * Creates Page Button Components
 * @param text
 * @param onClick
 * @param className
 * @returns {*}
 * @constructor
 */
const PageButton = ({ text, onClick, className }) => (
    <button className={ 'button button-page ' + className } onClick={ onClick }>{ text }</button>
);
/**
 * Declare prop-types
 * @type {{text: shim, onClick: shim, className: shim}}
 */
PageButton.propTypes = {
    /**
     * Page Button Text
     */
    text: PropTypes.node,
    /**
     * onClick function
     */
    onClick: PropTypes.func,
    /**
     * Page Button class name
     */
    className: PropTypes.string
};

export default PageButton;