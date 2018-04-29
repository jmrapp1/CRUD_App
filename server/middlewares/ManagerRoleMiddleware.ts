import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { UserRoles } from '../models/User';

export class ManagerRoleMiddleware implements ExpressMiddlewareInterface {

    /**
     * Role middleware to authenticate a manager user. Throws exception if not.
     *
     * @param req The HTTP request object
     * @param res The HTTP response object
     * @param {(err?: any) => any} next The express middleware function
     * @returns {any}
     */
    use(req: any, res: any, next: (err?: any) => any): any {
        if (req.user) {
            if (req.user.role === UserRoles.MANAGER) {
                return next();
            }
        }
        return next('You do not have permission to access this page.');
    }

}