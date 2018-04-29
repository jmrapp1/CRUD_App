import { BodyParam, Get, JsonController, Post, Req, Res, UseBefore } from 'routing-controllers';
import { Inject } from 'typedi';
import { encode } from 'jwt-simple';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import UserService from '../services/UserService';
import CustomerService from '../services/CustomerService';

@JsonController('/user')
export default class UserController {

    @Inject()
    userService: UserService;

    @Inject()
    customerService: CustomerService;

    constructor() {
    }

    /**
     * POST. Register a user by providing the necessary user information.
     * Returns response based on whether that data is good or not.
     *
     * @param request The HTTP response object
     * @param {string} email The email address. Must be unique
     * @param {string} firstName The first name
     * @param {string} lastName The last name
     * @param {string} phone The phone number
     * @param {string} password The password
     * @param {string} confirmPassword The password confirmation. Must match
     * @param response The HTTP response object
     * @returns {Promise<ServiceResponse>}
     */
    @Post('/register')
    register(@Req() request, @BodyParam('email') email: string, @BodyParam('firstName') firstName: string, @BodyParam('lastName') lastName: string,
             @BodyParam('phone') phone: string, @BodyParam('password') password: string, @BodyParam('confirmPassword') confirmPassword: string, @Res() response: any) {
        return this.customerService.register(email, firstName, lastName, phone, password, confirmPassword).then(res => {
            if (res.isSuccess()) {
                return response.status(201).json({});
            }
            return response.status(400).json(res.errors);
        });
    }

    /**
     * POST. Log into a user account. Returns the JWT token to attach to the client 'Authorization' header when making requests
     *
     * @param {string} email The email address
     * @param {string} password The password
     * @param response The response object
     * @returns {Promise<ServiceResponse>}
     */
    @Post('/login')
    login(@BodyParam('email') email: string, @BodyParam('password') password: string, @Res() response: any) {
        return this.userService.login(email, password).then(res => {
            if (res.isSuccess()) {
                return response.status(202).json(res.data);
            }
            return response.status(400).json(res.errors);
        });
    }

}
