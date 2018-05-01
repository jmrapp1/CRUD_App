import * as EmailValidator from 'email-validator';
import DatabaseService from './DatabaseService';
import ServiceResponse from './ServiceResponse';
import { Service } from 'typedi';
import User, { UserRoles } from '../models/User';
import Config from '../config/config';
import { encode } from 'jwt-simple';

const userRolesArray = Object.keys(UserRoles);

@Service()
export default class UserService extends DatabaseService {

    model = User;
    populate = ['business'];

    /**
     * Logs a user in
     * @param {string} email The email
     * @param {string} password The password
     * @returns {Promise<ServiceResponse>} The JWT token if successful, error if unsuccessful
     */
    login(email: string, password: string): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            if (email && password) {
                if (EmailValidator.validate(email)) {
                    this.findWithLimit({ email }, 1).then(userSearch => {
                        if (userSearch.isSuccess() && !userSearch.isEmpty()) {
                            const user = userSearch.data[ 0 ];
                            user.comparePassword(password).then(passValidated => {
                                if (passValidated) {
                                    const token = encode(user, Config.secret);
                                    return resolve(new ServiceResponse(false, { token: 'JWT ' + token }));
                                }
                                return resolve(new ServiceResponse(true, 'The email or password is incorrect.'));
                            });
                        } else {
                            return resolve(new ServiceResponse(true, 'The email or password is incorrect.'));
                        }
                    });
                } else {
                    return resolve(new ServiceResponse(true, 'Please enter a valid email.'));
                }
            } else {
                return resolve(new ServiceResponse(true, 'Please enter information into all forms.'));
            }
        });
    }

    /**
     * Validates the data used to register a user. Does not perform any insertion operations.
     * @param {string} email The email
     * @param {string} firstName The first name
     * @param {string} lastName The last name
     * @param {string} phone The phone number
     * @param {string} password The password
     * @param {string} confirmPassword The password confirmation
     * @param {string} role The role to set the user to
     * @param profile The profile data
     * @returns {Promise<ServiceResponse>} If the data passes or not
     */
    validateUserRegister(email: string, firstName: string, lastName: string, phone: string, password: string, confirmPassword: string, role: string, profile): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            if (email && firstName && lastName && phone && password && role) {
                if (EmailValidator.validate(email)) {
                    if (password.length >= 6) {
                        if (password === confirmPassword) {
                            if (phone.length === 10) {
                                if (phone.match(/^[0-9]+$/)) {
                                    if (this.userRoleValid(role)) {
                                        this.find({ email }).then(res => {
                                            if (res.isSuccess() && res.isEmpty()) {
                                                return resolve(new ServiceResponse(false));
                                            } else {
                                                return resolve(new ServiceResponse(true, 'That email has already been used.'));
                                            }
                                        });
                                    } else {
                                        return resolve(new ServiceResponse(true, 'Please select a valid role.'));
                                    }
                                } else {
                                    return resolve(new ServiceResponse(true, 'Please enter a valid phone number.'));
                                }
                            } else {
                                return resolve(new ServiceResponse(true, 'Please enter a valid phone number.'));
                            }
                        } else {
                            return resolve(new ServiceResponse(true, 'Please make sure the passwords match.'));
                        }
                    } else {
                        return resolve(new ServiceResponse(true, 'Please enter a password at least 6 characters long.'));
                    }
                } else {
                    return resolve(new ServiceResponse(true, 'Please enter a valid email.'));
                }
            } else {
                return resolve(new ServiceResponse(true, 'Please enter information into all forms.'));
            }
        });
    }

    /**
     * Registers a user
     * @param {string} email The email
     * @param {string} firstName The first name
     * @param {string} lastName The last name
     * @param {string} phone The phone number
     * @param {string} password The password
     * @param {string} confirmPassword The password confirmation
     * @param {string} role The role to set the user to
     * @param profile The profile data
     * @returns {Promise<ServiceResponse>} If they registered successfully or not
     */
    register(email: string, firstName: string, lastName: string, phone: string, password: string, confirmPassword: string, role: string = UserRoles.CUSTOMER, profile = {}): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            this.validateUserRegister(email, firstName, lastName, phone, password, confirmPassword, role, profile).then(valRes => {
                if (valRes.isSuccess()) {
                    this.insert({
                        email,
                        firstName,
                        lastName,
                        phone,
                        password,
                        role,
                        profile
                    }).then(insertRes => {
                        return resolve(insertRes);
                    });
                } else {
                    return resolve(valRes);
                }
            })
        });
    }

    /**
     * Validates that the given role is an actual defined role
     * @param {string} role The role to check
     * @returns {boolean} If it's real
     */
    userRoleValid(role: string) {
        for (let i = 0; i < userRolesArray.length; i++) {
            if (userRolesArray[ i ] === role) {
                return true;
            }
        }
        return false;
    }

}