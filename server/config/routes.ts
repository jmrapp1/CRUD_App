const path = require('path');
import * as express from 'express';

const expressControllers = require('express-controller');

const controllersDirectory = path.join(__dirname, '../controllers');

export default function setRoutes(app) {

    const router = express.Router();

    router.use(function (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Credentials', true);
        next();
    });

    // Apply the routes to our application with the prefix /api
    app.use('/api', router);

    expressControllers
        .setDirectory(controllersDirectory)
        .bind(router);
}
