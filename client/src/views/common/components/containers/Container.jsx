import React from 'react';
import PropTypes from 'prop-types';
import './Container.css';

const Container = ({ children, padding = 30, className = '' }) => (
    <div className={ 'Container ' + className } style={ { padding } }>
        { children }
    </div>
);

Container.propTypes = {
    children: PropTypes.node,
    padding: PropTypes.number,
    className: PropTypes.string
};

export default Container;