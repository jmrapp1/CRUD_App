import * as dotenv from 'dotenv';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import 'reflect-metadata'; // required

import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import registerPassport from './config/passport';
import DatabaseSetup from './util/DatabaseSetup';
import UserController from './controllers/UserController';
import EmployeeController from './controllers/EmployeeController';
import CustomerController from './controllers/CustomerController';
import BusinessController from './controllers/BusinessController';

useContainer(Container);

const express = require('express');

const app = createExpressServer({
    cors: true,
    routePrefix: '/api',
    controllers: [ UserController, EmployeeController, CustomerController, BusinessController ]
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

new DatabaseSetup().setupDb(() => {

    registerPassport(passport);

    app.listen(app.get('port'), () => {
        console.log('Listening on port ' + app.get('port'));
    });
});

export { app };
