import * as dotenv from 'dotenv';
import * as morgan from 'morgan';
import 'reflect-metadata'; // required
import { createExpressServer } from 'routing-controllers';
import TestController from './controllers/TestController';
import DatabaseSetup from './util/DatabaseSetup';

const express = require('express');

const app = createExpressServer({
    cors: true,
    routePrefix: '/api',
    controllers: [TestController]
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use(morgan('dev'));

new DatabaseSetup().setupDb(() => {
    app.listen(app.get('port'), () => {
        console.log('Listening on port ' + app.get('port'));
    });
});

export { app };
