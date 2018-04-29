import {ExpressMiddlewareInterface, Middleware} from 'routing-controllers';

@Middleware({ type: 'before' })
class HeaderMiddleware implements ExpressMiddlewareInterface {

    /**
     * Header middleware. Adds headers to response before any other information is added to it
     *
     * @param req The HTTP request object
     * @param res The HTTP response object
     * @param {(err?: any) => any} next The express middleware function
     * @returns {any}
     */
    use(req: any, res: any, next: (err?: any) => any): any {
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Credentials', true);
        next();
    }

}