import { ExpressMiddlewareInterface } from 'routing-controllers';
import { UserRoles } from '../models/User';

export class AdminRoleMiddleware implements ExpressMiddlewareInterface {

    /**
     * Role middleware to authenticate an admin user. Throws exception if not.
     *
     * @param req The HTTP request object
     * @param res The HTTP response object
     * @param {(err?: any) => any} next The express middleware function
     * @returns {any}
     */
    use(req: any, res: any, next: (err?: any) => any): any {
        if (req.user) {
            console.log(req.user.role);
            if (req.user.role === UserRoles.ADMIN) {
                return next();
            }
        }
        return next('You do not have permission to access this page.');
    }

}