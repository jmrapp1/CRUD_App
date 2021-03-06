import * as EmailValidator from 'email-validator';
import * as _ from 'lodash';
import DatabaseService from './DatabaseService';
import ServiceResponse from './ServiceResponse';
import { Container, Service } from 'typedi';
import User, { UserRoles } from '../models/User';
import Config from '../config/config';
import { encode } from 'jwt-simple';
import UserService from './UserService';
import { validate } from 'email-validator';

const userService = Container.get(UserService);

@Service()
export default class EmployeeService extends DatabaseService {

    model = User;
    populate = [ 'business' ];

    /**
     * Registers an employee with some business
     * @param {string} email The email
     * @param {string} firstName The first name
     * @param {string} lastName The last name
     * @param {string} phone The phone number
     * @param {string} password The password
     * @param {string} confirmPassword The password confirmation
     * @param {number} payRate The payrate
     * @param {boolean} monday Whether they work on monday
     * @param {boolean} tuesday Whether they work on tuesday
     * @param {boolean} wednesday Whether they work on wednesday
     * @param {boolean} thursday Whether they work on thursday
     * @param {boolean} friday Whether they work on friday
     * @param {boolean} saturday Whether they work on saturday
     * @param {boolean} sunday Whether they work on sunday
     * @returns {Promise<ServiceResponse>} If they were registered successfully or not
     */
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

    /**
     * Edits an employee with new data. NOT WORKING FULLY DO NOT USE.
     * @param {string} employeeId The employee ID
     * @param {string} email The email
     * @param {string} firstName The first name
     * @param {string} lastName The last name
     * @param {string} phone The phone number
     * @param {number} payRate The payrate
     * @returns {Promise<ServiceResponse>} If the employee was edited
     */
    edit(employeeId: string, email: string, firstName: string, lastName: string, phone: string, payRate: number) {
        return new Promise<ServiceResponse>(resolve => {
            this.validateEdit(employeeId, email, firstName, lastName, phone, payRate).then(valRes => {
                if (valRes.isSuccess()) {
                    const employee = valRes.data;
                    employee.email = email;
                    employee.firstName = firstName;
                    employee.lastName = lastName;
                    employee.phone = phone;
                    employee.profile.payRate = payRate;
                    this.updateById(employee._id.toString(), { email, firstName, lastName, phone }).then(updateRes => {
                        return resolve(updateRes);
                    });
                } else {
                    return resolve(valRes);
                }
            });
        });
    }

    /**
     * Validates the data of an employee edit
     * @param {string} employeeId The employee ID
     * @param {string} email The email
     * @param {string} firstName The first name
     * @param {string} lastName The last name
     * @param {string} phone The phone number
     * @param {number} payRate The payrate
     * @returns {Promise<ServiceResponse>} If the employee's new data is OK
     */
    validateEdit(employeeId: string, email: string, firstName: string, lastName: string, phone: string, payRate: number) {
        return new Promise<ServiceResponse>(resolve => {
            if (email && firstName && lastName && phone && payRate && phone) {
                this.findById(employeeId).then(employeeRes => {
                    if (employeeRes.isSuccess()) {
                        if (payRate >= 0.00) {
                            if (phone.length === 10) {
                                if (phone.match(/^[0-9]+$/)) {
                                    if (employeeRes.data.email !== email) {
                                        if (EmailValidator.validate(email)) {
                                            userService.find({ email }).then(res => {
                                                if (res.isSuccess() && res.isEmpty()) {
                                                    return resolve(new ServiceResponse(false, employeeRes.data));
                                                } else {
                                                    return resolve(new ServiceResponse(true, 'That email has already been used.'));
                                                }
                                            });
                                        } else {
                                            return resolve(new ServiceResponse(true, 'Please enter a valid email.'));
                                        }
                                    } else {
                                        return resolve(new ServiceResponse(false, employeeRes.data));
                                    }
                                } else {
                                    return resolve(new ServiceResponse(true, 'Please enter a valid phone number.'));
                                }
                            } else {
                                return resolve(new ServiceResponse(true, 'Please enter a valid phone number.'));
                            }
                        } else {
                            return resolve(new ServiceResponse(true, 'Please enter a pay rate.'));
                        }
                    } else {
                        return resolve(new ServiceResponse(true, 'Could not find an employee with that ID.'));
                    }
                });
            } else {
                return resolve(new ServiceResponse(true, 'Please enter all information.'));
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
    findWithLimit(findParams, limit, offset = 0): Promise<ServiceResponse> {
        return super.findWithLimit(this.checkBodyForRole(findParams), limit, offset);
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
