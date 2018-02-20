import * as EmailValidator from 'email-validator';
import * as _ from 'lodash';
import DatabaseService from './DatabaseService';
import ServiceResponse from './ServiceResponse';
import { Container, Service } from 'typedi';
import User, { UserRoles } from '../models/User';
import Config from '../config/config';
import { encode } from 'jwt-simple';
import UserService from './UserService';

const userService = Container.get(UserService);

@Service()
export default class EmployeeService extends DatabaseService {

    model = User;

    register(email: string, firstName: string, lastName: string, phone: string, password: string, confirmPassword: string,
             payRate: number, monday: boolean, tuesday: boolean, wednesday: boolean, thursday: boolean, friday: boolean,
             saturday: boolean, sunday: boolean): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            if (payRate && payRate >= 0.00) {
                if (!_.isUndefined(monday) && !_.isUndefined(tuesday) && !_.isUndefined(wednesday) && !_.isUndefined(thursday) &&
                    !_.isUndefined(friday) && !_.isUndefined(saturday) && !_.isUndefined(sunday)) {
                    const profile = {
                        payRate,
                        daysWorking: {
                            monday,
                            tuesday,
                            wednesday,
                            thursday,
                            friday,
                            saturday,
                            sunday
                        }
                    };
                    return resolve(userService.register(email, firstName, lastName, phone, password, confirmPassword, UserRoles.EMPLOYEE, profile));
                } else {
                    return resolve(new ServiceResponse(true, 'Please enter the days the employee works.'));
                }
            } else {
                return resolve(new ServiceResponse(true, 'Please enter a pay rate.'));
            }
        });
    }

    /** Override */
    insert(body): Promise<ServiceResponse> {
        return super.insert(this.checkBodyForRole(body));
    }

    /** Override */
    delete(body): Promise<ServiceResponse> {
        return super.delete(this.checkBodyForRole(body));
    }

    /** Override */
    findAll(): Promise<ServiceResponse> {
        return super.find(this.checkBodyForRole({}));
    }

    /** Override */
    count(query = {}): Promise<ServiceResponse> {
        return super.count(this.checkBodyForRole(query));
    }

    /** Override */
    findWithLimit(findParams, limit): Promise<ServiceResponse> {
        return super.findWithLimit(this.checkBodyForRole(findParams), limit);
    }

    /** Override */
    find(findParams): Promise<ServiceResponse> {
        return super.find(this.checkBodyForRole(findParams));
    }

    checkBodyForRole(body) {
        if (!body.role || !( body.role === UserRoles.EMPLOYEE )) body.role = UserRoles.EMPLOYEE;
        return body;
    }

}