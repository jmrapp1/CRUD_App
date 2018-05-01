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
export default class ManagerService extends DatabaseService {

    model = User;
    populate = ['business'];

    /**
     * Validates the data used to register a manager. Does not perform an insertion operations.
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
     * @returns {Promise<ServiceResponse>} If the data passes or not
     */
    validateManagerRegister(email: string, firstName: string, lastName: string, phone: string, password: string, confirmPassword: string,
                            payRate: number, monday: boolean, tuesday: boolean, wednesday: boolean, thursday: boolean, friday: boolean,
                            saturday: boolean, sunday: boolean): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            if (!_.isUndefined(monday) && !_.isUndefined(tuesday) && !_.isUndefined(wednesday) && !_.isUndefined(thursday) &&
                !_.isUndefined(friday) && !_.isUndefined(saturday) && !_.isUndefined(sunday) && payRate) {
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
                return resolve(userService.validateUserRegister(email, firstName, lastName, phone, password, confirmPassword, UserRoles.MANAGER, profile));
            } else {
                return resolve(new ServiceResponse(true, 'Please enter the days the manager works.'));
            }
        });
    }

    /**
     * Registers a manager
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
     * @returns {Promise<ServiceResponse>} If they were registered or not
     */
    register(email: string, firstName: string, lastName: string, phone: string, password: string, confirmPassword: string,
             payRate: number, monday: boolean, tuesday: boolean, wednesday: boolean, thursday: boolean, friday: boolean,
             saturday: boolean, sunday: boolean): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            this.validateManagerRegister(email, firstName, lastName, phone, password, confirmPassword, payRate, monday, tuesday, wednesday, thursday, friday, saturday, sunday).then(valRes => {
                if (valRes.isSuccess()) {
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
                    return resolve(userService.register(email, firstName, lastName, phone, password, confirmPassword, UserRoles.MANAGER, profile));
                } else {
                    return resolve(valRes);
                }
            });
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
        if (!body.role || !( body.role === UserRoles.MANAGER )) body.role = UserRoles.MANAGER;
        return body;
    }

}