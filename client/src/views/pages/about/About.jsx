import React, { Component } from 'react';
import './About.css';
import Container from '../../common/components/containers/Container';
import { connect } from 'react-redux';

/**
 * Creates About Page
 */
class About extends Component {
    render() {
        return (
            <div id="about-home">
                <div className="content">
                    <div className="col-sm-12 col-md-8 col-md-offset-2 vertical-center">
                        <Container className="container">
                            <h1 className="about-title">About</h1>
                            <br/>
                            <h1 className="question">What is UManage?</h1>
                            <br/>
                            <span className="answer">
                                &emsp;CRUD Base Application. It will allow a manager from a business to manage the employees of their business.
                                For example, a barber shop manager can keep track of all the barbers schedule, salary and etc. As well as
                                editing their schedule and/or salary if needed.
                            </span>
                            <br/>
                            <br/>
                            <h1 className="question">Technology Used</h1>
                            <div className="answer">
                                <h4>&emsp;<b><ins>Frontend: Mike Rivera</ins></b></h4>
                                <li>ReactJS</li>
                                <li>SCSS</li>
                                <li>Bootstrap</li>
                                <h4>&emsp;<b><ins>Backend: Jon Rapp</ins></b></h4>
                                <li>NodeJS</li>
                                <li>Express</li>
                                <li>MongoDB with the Mongoose Package</li>
                                <li>PassportJS for Authentication</li>
                                <li>Routing-Controllers Package to manage a model-service-controller-structure</li>
                            </div>
                            <br/>
                            <div className="github">
                                <a href="https://github.com/jmrapp1/CRUD_App">Github</a>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>

        );
    }
}



export default connect(

)(About);
