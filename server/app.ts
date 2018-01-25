import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as express from 'express';
import * as morgan from 'morgan';
import setRoutes from './config/routes';

const app = express();
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
