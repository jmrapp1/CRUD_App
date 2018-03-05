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

@JsonController('/employee')
export default class EmployeeController {

    @Inject()
    employeeService: EmployeeService;

    @Inject()
    businessService: BusinessService;

    constructor() {
    }

    @Post('/register')
    register(@Req() request, @BodyParam('email') email: string, @BodyParam('firstName') firstName: string, @BodyParam('lastName') lastName: string,
             @BodyParam('phone') phone: string, @BodyParam('password') password: string, @BodyParam('confirmPassword') confirmPassword: string,
             @BodyParam('payRate') payRate: number, @BodyParam('businessId') businessId: string, @BodyParam('monday') monday: boolean, @BodyParam('tuesday') tuesday: boolean,
             @BodyParam('wednesday') wednesday: boolean, @BodyParam('thursday') thursday: boolean, @BodyParam('friday') friday: boolean,
             @BodyParam('saturday') saturday: boolean, @BodyParam('sunday') sunday: boolean, @Res() response: any) {
        return new Promise(resolve => {
            console.log('BUSINESS ID: ' + businessId);
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

    @UseBefore(AuthMiddleware, EmployeeRoleMiddleware)
    @Get('/')
    getEmployees(@QueryParam('size') size: number, @QueryParam('offset') offset: number, @Res() response: any) {
        return this.employeeService.findWithLimit({}, size, offset).then(res => {
            if (res.isSuccess()) {
                return response.status(200).json(res.data);
            }
            return response.status(400).json(res.errors);
        });
    }

    @UseBefore(AuthMiddleware, EmployeeRoleMiddleware)
    @Get('/count')
    getTotalEmployees(@Res() response: any) {
        return this.employeeService.count().then(res => {
            if (res.isSuccess()) {
                return response.status(200).json(res.data);
            }
            return response.status(400).json(res.errors);
        });
    }

}
