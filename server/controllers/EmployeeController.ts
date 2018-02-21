import {
    BodyParam, Get, JsonController, Post, QueryParam, QueryParams, Req, Res,
    UseBefore
} from 'routing-controllers';
import { Inject } from 'typedi';
import { encode } from 'jwt-simple';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import EmployeeService from '../services/EmployeeService';
import { EmployeeRoleMiddleware } from '../middlewares/EmployeeRoleMiddleware';

@JsonController('/employee')
export default class EmployeeController {

    @Inject()
    employeeService: EmployeeService;

    constructor() {
    }

    @Post('/register')
    register(@Req() request, @BodyParam('email') email: string, @BodyParam('firstName') firstName: string, @BodyParam('lastName') lastName: string,
             @BodyParam('phone') phone: string, @BodyParam('password') password: string, @BodyParam('confirmPassword') confirmPassword: string,
             @BodyParam('payRate') payRate: number, @BodyParam('monday') monday: boolean, @BodyParam('tuesday') tuesday: boolean,
             @BodyParam('wednesday') wednesday: boolean, @BodyParam('thursday') thursday: boolean, @BodyParam('friday') friday: boolean,
             @BodyParam('saturday') saturday: boolean, @BodyParam('sunday') sunday: boolean, @Res() response: any) {
        return this.employeeService.register(email, firstName, lastName, phone, password, confirmPassword, payRate, monday,
            tuesday, wednesday, thursday, friday, saturday, sunday).then(res => {
            if (res.isSuccess()) {
                return response.status(201).json({});
            }
            return response.status(400).json(res.errors);
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
