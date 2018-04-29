import {
    BodyParam, Get, JsonController, Post, QueryParam, QueryParams, Req, Res,
    UseBefore
} from 'routing-controllers';
import { Inject } from 'typedi';
import { encode } from 'jwt-simple';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import EmployeeService from '../services/EmployeeService';
import { EmployeeRoleMiddleware } from '../middlewares/EmployeeRoleMiddleware';
import BusinessService from '../services/BusinessService';
import { ManagerRoleMiddleware } from '../middlewares/ManagerRoleMiddleware';

@JsonController('/employee')
export default class EmployeeController {

    @Inject()
    employeeService: EmployeeService;

    @Inject()
    businessService: BusinessService;

    constructor() {
    }

    /**
     * POST. Authorized endpoint. Must be a Manager. Register a new employee for the business the requesting user works for
     *
     * @param request The HTTP request object
     * @param email The email address. Must be unique
     * @param firstName The first name
     * @param lastName The last name
     * @param phone The phone number
     * @param password The password
     * @param confirmPassword The password confirmation. Must match
     * @param payRate The employees rate
     * @param monday Whether the manager works on monday
     * @param tuesday Whether the manager works on tuesday
     * @param wednesday Whether the manager works on wednesday
     * @param thursday Whether the manager works on thursday
     * @param friday Whether the manager works on friday
     * @param saturday Whether the manager works on saturday
     * @param sunday Whether the manager works on sunday
     * @param response The HTTP response object
     * @returns {Promise<any>}
     */
    @UseBefore(AuthMiddleware, ManagerRoleMiddleware)
    @Post('/register')
    register(@Req() request, @BodyParam('email') email: string, @BodyParam('firstName') firstName: string, @BodyParam('lastName') lastName: string,
             @BodyParam('phone') phone: string, @BodyParam('password') password: string, @BodyParam('confirmPassword') confirmPassword: string,
             @BodyParam('payRate') payRate: number, @BodyParam('monday') monday: boolean, @BodyParam('tuesday') tuesday: boolean,
             @BodyParam('wednesday') wednesday: boolean, @BodyParam('thursday') thursday: boolean, @BodyParam('friday') friday: boolean,
             @BodyParam('saturday') saturday: boolean, @BodyParam('sunday') sunday: boolean, @Res() response: any) {
        return new Promise(resolve => {
            const businessId = request.user.business;
            this.businessService.findById(businessId).then(busRes => {
                if (busRes.isSuccess() && !busRes.isEmpty()) {
                    const business = busRes.data;
                    this.employeeService.register(email, firstName, lastName, phone, password, confirmPassword, payRate, monday,
                        tuesday, wednesday, thursday, friday, saturday, sunday).then(regRes => {
                        if (regRes.isSuccess()) {
                            const user = regRes.data;
                            this.businessService.attachBusinessToUser(user, business).then(attRes => {
                                if (attRes.isSuccess()) {
                                    return resolve(response.status(201).json({}));
                                }
                                return resolve(response.status(400).json(attRes.errors));
                            });
                        } else {
                            return resolve(response.status(400).json(regRes.errors));
                        }
                    });
                } else {
                    return resolve(response.status(400).json([ 'No business was found with that ID.' ]));
                }
            });
        });
    }

    /**
     * GET. Authorized endpoint. Must be a Manager. Paginates through all employees who work for the business of the requesting user
     *
     * @param req The HTTP request object
     * @param {number} size The number of employees to return
     * @param {number} offset The number of employees to offset
     * @param response The HTTP response object
     * @returns {Promise<ServiceResponse>}
     */
    @UseBefore(AuthMiddleware, ManagerRoleMiddleware)
    @Get('/')
    getEmployees(@Req() req, @QueryParam('size') size: number, @QueryParam('offset') offset: number, @Res() response: any) {
        return this.employeeService.findWithLimit({
            business: req.user.business
        }, size, offset).then(res => {
            if (res.isSuccess()) {
                return response.status(200).json(res.data);
            }
            return response.status(400).json(res.errors);
        });
    }

    /**
     * GET. Authorized endpoint. Must be a Manager. Returns the number of employees who work for the business of the requesting user
     * @param req The HTTP request object
     * @param response The HTTP response object
     * @returns {Promise<ServiceResponse>}
     */
    @UseBefore(AuthMiddleware, ManagerRoleMiddleware)
    @Get('/count')
    getTotalEmployees(@Req() req, @Res() response: any) {
        return this.employeeService.count({
            business: req.user.business
        }).then(res => {
            console.log('Count REs: ' + JSON.stringify(res));
            if (res.isSuccess()) {
                return response.status(200).json(res.data);
            }
            return response.status(400).json(res.errors);
        });
    }

}
