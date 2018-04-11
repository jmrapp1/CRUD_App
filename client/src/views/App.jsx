import React, { Component } from 'react';
import './App.css';
import Header from "./layout/Header";
import Content from "./layout/Content";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions as UserActions } from '../redux/modules/user';

class App extends Component {

    constructor(props) {
        super(props);
        UserActions.decodeUserDataToStoreFromLocal(props.dispatch);
    }

    render() {
        return (
            <div id="app" className="container-fluid">
                <Header history={this.props.history} />
                <Content/>
            </div>
        );
    }
}

App.propTypes = {
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect()(App);