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
import { ManagerOrEmployeeRoleMiddleware } from '../middlewares/ManagerOrEmployeeRoleMiddleware';

@JsonController('/customer')
export default class CustomerController {

    @Inject()
    customerService: CustomerService;

    constructor() {
    }

    /**
     * GET. Authorized Endpoint. Must be Manager or Employee. Paginates all customers from the database.
     *
     * @param req The HTTP Request object
     * @param {number} size The amount of customers to return
     * @param {number} offset The number of customers to offset
     * @param response The HTTP Response object
     * @returns {Promise<ServiceResponse>}
     */
    @UseBefore(AuthMiddleware, ManagerOrEmployeeRoleMiddleware)
    @Get('/')
    getCustomers(@Req() req, @QueryParam('size') size: number, @QueryParam('offset') offset: number, @Res() response: any) {
        return this.customerService.findWithLimit({
            business: req.user.business
        }, size, offset).then(res => {
            if (res.isSuccess()) {
                return response.status(200).json(res.data);
            }
            return response.status(400).json(res.errors);
        });
    }

    /**
     * GET. Authorized Endpoint. Must be a Manager or Employee. Gets the total number of customers of the
     * business that the requesting user works for
     *
     * @param req The HTTP request object
     * @param response The HTTP response object
     * @returns {Promise<ServiceResponse>}
     */
    @UseBefore(AuthMiddleware, ManagerOrEmployeeRoleMiddleware)
    @Get('/count')
    getTotalCustomers(@Req() req, @Res() response: any) {
        return this.customerService.count({
            business: req.user.business
        }).then(res => {
            if (res.isSuccess()) {
                return response.status(200).json(res.data);
            }
            return response.status(400).json(res.errors);
        });
    }

}
