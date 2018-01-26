import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as morgan from 'morgan';
import setRoutes from './config/routes';

import "reflect-metadata"; // required
import { createExpressServer } from "routing-controllers";
import TestController from './controllers/TestController';

const express = require('express');

const app = createExpressServer({
    controllers: [TestController]
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(morgan('dev'));

app.listen(app.get('port'), () => {
    setRoutes(app);

    console.log('Listening on port ' + app.get('port'));
});

export { app };
