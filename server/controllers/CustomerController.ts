import {
    BodyParam, Get, JsonController, Post, QueryParam, QueryParams, Req, Res,
    UseBefore
} from 'routing-controllers';
import { Inject } from 'typedi';
import { encode } from 'jwt-simple';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import EmployeeService from '../services/EmployeeService';
import { EmployeeRoleMiddleware } from '../middlewares/EmployeeRoleMiddleware';
import CustomerService from '../services/CustomerService';

@JsonController('/customer')
export default class CustomerController {

    @Inject()
    customerService: CustomerService;

    constructor() {
    }

    @UseBefore(AuthMiddleware, EmployeeRoleMiddleware)
    @Get('/')
    getCustomers(@QueryParam('size') size: number, @QueryParam('offset') offset: number, @Res() response: any) {
        return this.customerService.findWithLimit({}, size, offset).then(res => {
            if (res.isSuccess()) {
                return response.status(200).json(res.data);
            }
            return response.status(400).json(res.errors);
        });
    }

    @UseBefore(AuthMiddleware, EmployeeRoleMiddleware)
    @Get('/count')
    getTotalCustomers(@Res() response: any) {
        return this.customerService.count().then(res => {
            if (res.isSuccess()) {
                return response.status(200).json(res.data);
            }
            return response.status(400).json(res.errors);
        });
    }

}
