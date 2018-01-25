import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as morgan from 'morgan';
import setRoutes from './config/routes';

import "reflect-metadata"; // required
import { createExpressServer } from "routing-controllers";
import TestController from './controllers/TestController';
import * as path from 'path';
import * as express from 'express';

const app = createExpressServer({
    controllers: [TestController]
});
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'client/public')));

app.listen(app.get('port'), () => {
    setRoutes(app);

    console.log('Listening on port ' + app.get('port'));
});

export { app };
