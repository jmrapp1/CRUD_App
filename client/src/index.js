import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/Store';
import Provider from 'react-redux/es/components/Provider';

const store = configureStore();

ReactDOM.render((
        <Provider store={ store }>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root'));
