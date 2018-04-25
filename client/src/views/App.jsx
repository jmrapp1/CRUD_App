import React, { Component } from 'react';
import './App.css';
import Header from "./layout/Header";
import Content from "./layout/Content";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions as UserActions } from '../redux/modules/user';
import { ToastContainer } from 'react-toastify';

/**
 * Creates the App
 */
class App extends Component {
    /**
     *
     * @param Returns local data
     */
    constructor(props) {
        super(props);
        UserActions.decodeUserDataToStoreFromLocal(props.dispatch);
    }

    /**
     *
     * @returns the header history
     */
    render() {
        return (
            <div id="app" className="container-fluid">
                <ToastContainer autoClose={ 3000 }/>
                <Header history={ this.props.history }/>
                <Content/>
            </div>
        );
    }
}

/**
 *
 * @type {{history, dispatch}}
 *
 */
App.propTypes = {
    /**
     * Keeps the history of the page
     */
    history: PropTypes.object.isRequired,
    /**
     * Talks to redux
     */
    dispatch: PropTypes.func.isRequired
};

export default connect()(App);