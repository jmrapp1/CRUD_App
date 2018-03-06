import { ExpressMiddlewareInterface } from 'routing-controllers';
import { UserRoles } from '../models/User';

export class AdminRoleMiddleware implements ExpressMiddlewareInterface {

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