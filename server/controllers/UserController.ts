import { BodyParam, Get, JsonController, Post, Req, Res, UseBefore } from 'routing-controllers';
import { Inject } from 'typedi';
import { encode } from 'jwt-simple';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import UserService from '../services/UserService';

@JsonController()
export default class UserController {

    @Inject()
    userService: UserService;

    constructor() {
    }

    @Post('/register')
    register(@Req() request, @BodyParam('email') email: string, @BodyParam('firstName') firstName: string, @BodyParam('lastName') lastName: string,
             @BodyParam('phone') phone: string, @BodyParam('password') password: string, @BodyParam('confirmPassword') confirmPassword: string, @Res() response: any) {
        return this.userService.register(email, firstName, lastName, phone, password, confirmPassword).then(res => {
            if (res.isSuccess()) {
                return response.status(201).json({});
            }
            return response.status(400).json(res.errors);
        });
    }

    @Post('/login')
    login(@BodyParam('email') email: string, @BodyParam('password') password: string, @Res() response: any) {
        return this.userService.login(email, password).then(res => {
            if (res.isSuccess()) {
                return response.status(202).json(res.data);
            }
            return response.status(400).json(res.errors);
        });
    }

    @Get('/users')
    getAllUsers(@Res() response: any) {
        return this.userService.findAll().then(res => {
            if (res.isSuccess()) {
                return response.status(200).json(res.data);
            }
            return response.status(400).json(res.errors);
        });
    }

}
