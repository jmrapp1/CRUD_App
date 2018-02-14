import React, { Component } from 'react';
import './HomePage.css';
import Container from '../../common/components/containers/Container';
import { Link } from 'react-router-dom';
import BrandView from './BrandView';

class HomePage extends Component {
    render() {
        return (
            <div id="home">
                <BrandView />
            </div>
        );
    }
}

export default HomePage;
