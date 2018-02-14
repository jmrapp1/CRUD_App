import React, { Component } from "react";
import { Route } from "react-router-dom";
import { NavItem } from "react-bootstrap";
import * as $ from 'jquery';
import './BrandView.css';
import Cloud from '../../common/images/cloud.jpg';

class BrandView extends Component {

    componentDidMount() {
        $('.logo-header').delay(200).animate({ opacity: 1 }, 700);
        $(".cloud-left").animate({
            marginLeft: "16%"
        }, 1000);
        $(".cloud-right").animate({
            marginLeft: "77%"
        }, 1000);
    }

    render() {
        return (
            <div id="brand">
                <img className="cloud cloud-left" src={ Cloud } />
                <img className="cloud cloud-right" src={ Cloud } />
                <div className="logo-header text-center">
                    <h1>UManage</h1>
                    <h2>Power your business with ease and reliability</h2>
                </div>
            </div>
        );
    }

}
export default BrandView;