import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { UserRoles } from '../models/User';

export class ManagerOrEmployeeRoleMiddleware implements ExpressMiddlewareInterface {

    use(req: any, res: any, next: (err?: any) => any): any {
        if (req.user) {
            if (req.user.role === UserRoles.MANAGER || req.user.role === UserRoles.EMPLOYEE) {
                return next();
            }
        }
        return next('You do not have permission to access this page.');
    }

}