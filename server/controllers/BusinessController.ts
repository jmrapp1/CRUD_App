import { BodyParam, Get, JsonController, Post, Req, Res, UseBefore } from 'routing-controllers';
import { Inject } from 'typedi';
import { encode } from 'jwt-simple';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import UserService from '../services/UserService';
import CustomerService from '../services/CustomerService';
import BusinessService from '../services/BusinessService';
import ManagerService from '../services/ManagerService';
import ServiceResponse from '../services/ServiceResponse';

@JsonController('/business')
export default class BusinessController {

    @Inject()
    businessService: BusinessService;

    @Inject() managerService: ManagerService;

    constructor() {
    }

    @Post('/register')
    register(@Req() request, @BodyParam('email') email: string, @BodyParam('firstName') firstName: string, @BodyParam('lastName') lastName: string,
             @BodyParam('phone') phone: string, @BodyParam('password') password: string, @BodyParam('confirmPassword') confirmPassword: string,
             @BodyParam('payRate') payRate: number, @BodyParam('monday') monday: boolean, @BodyParam('tuesday') tuesday: boolean,
             @BodyParam('wednesday') wednesday: boolean, @BodyParam('thursday') thursday: boolean, @BodyParam('friday') friday: boolean,
             @BodyParam('saturday') saturday: boolean, @BodyParam('sunday') sunday: boolean, @BodyParam('name') name: string,
             @BodyParam('street') street: string, @BodyParam('city') city: string, @BodyParam('state') state: string,
             @BodyParam('zipcode') zipcode: string, @Res() response: any) {
        return new Promise(resolve => {
            this.businessService.validateRegister(name, street, city, state, zipcode).then(busValRes => {
                if (busValRes.isSuccess()) {
                    this.managerService.validateManagerRegister(email, firstName, lastName, phone, password, confirmPassword, monday, tuesday,
                        wednesday, thursday, friday, saturday, sunday).then(managerValRes => {
                        if (managerValRes.isSuccess()) {
                            // If here it means we've passed all validation and can register successfully
                            this.businessService.register(name, street, city, state, zipcode).then(busRes => {
                                if (busRes.isSuccess()) {
                                    const business = busRes.data;
                                    this.managerService.register(email, firstName, lastName, phone, password, confirmPassword, monday, tuesday,
                                        wednesday, thursday, friday, saturday, sunday).then(managerRes => {
                                        if (managerRes.isSuccess()) {
                                            const manager = managerRes.data;
                                            this.businessService.attachBusinessToUser(manager, business).then(attRes => {
                                                if (attRes.isSuccess()) {
                                                    return resolve(response.status(201).json({}));
                                                }
                                                return resolve(response.status(400).json(managerValRes.errors));
                                            });
                                        } else {
                                            console.error('CRITICAL ERROR REGISTERING BUSINESS: ' + JSON.stringify(managerRes.errors));
                                            return resolve(response.status(400).json(managerRes.errors)); // Should never reach here, just fail-safe
                                        }
                                    });
                                } else {
                                    console.error('CRITICAL ERROR REGISTERING BUSINESS: ' + JSON.stringify(busRes.errors));
                                    return resolve(response.status(400).json(busRes.errors)); // Should never reach here, just fail-safe
                                }
                            });
                        } else {
                            return resolve(response.status(400).json(managerValRes.errors));
                        }
                    });
                } else {
                    return resolve(response.status(400).json(busValRes.errors));
                }
            });
        });
    }

    @Get('/')
    getAllUsers(@Res() response: any) {
        return this.businessService.findAll().then(res => {
            if (res.isSuccess()) {
                return response.status(200).json(res.data);
            }
            return response.status(400).json(res.errors);
        });
    }

}
