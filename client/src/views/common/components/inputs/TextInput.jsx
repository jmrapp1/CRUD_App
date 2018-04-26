import React from 'react';
import PropTypes from 'prop-types';
import './TextInput.css';

/**
 * Creates Text Input Component
 * @param name
 * @param placeholder
 * @param value
 * @param type
 * @param onChange
 * @returns {*}
 * @constructor
 */
const TextInput = ({ name, placeholder = "", value = "", type = "text", onChange = () => {} }) => (
    <input className="textInput" name={ name } placeholder={ placeholder } value={ value } onChange={ onChange } type={ type } />
);

/**
 * Declare Prop Types
 * @type {{name: shim, placeholder: shim, value: shim, onChange: shim, type: shim}}
 */
TextInput.propTypes = {
    /**
     * Text Input name
     */
    name: PropTypes.string,
    /**
     * Text Input place holder text
     */
    placeholder: PropTypes.string,
    /**
     * Text Input value
     */
    value: PropTypes.string,
    /**
     * onChange function
     */
    onChange: PropTypes.func,
    /**
     * Text Input type
     */
    type: PropTypes.string
};

export default TextInput;