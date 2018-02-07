import * as dotenv from 'dotenv';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import 'reflect-metadata'; // required

import { Action, createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import TestController from './controllers/TestController';
import registerPassport from './config/passport';
import DatabaseSetup from './util/DatabaseSetup';

useContainer(Container);

const express = require('express');

const app = createExpressServer({
    cors: true,
    routePrefix: '/api',
    controllers: [ TestController ]/*,
    authorizationChecker: async (action: Action, args: string[]) => {
        const res = await new Promise<Boolean>(async resolve => {
            const res2 = passport.authenticate('jwt', { session: false })(action.request, action.response, action.next);
            console.log('Response From: ' + JSON.stringify(res2));
            resolve(true);
        });
        console.log('Res: ' + res);
        return res;
    }*/
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
