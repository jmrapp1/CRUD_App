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
export default class CustomerService extends DatabaseService {

    model = User;

    /** Override to set customer role */
    insert(body): Promise<ServiceResponse> {
        return super.insert(this.checkBodyForRole(body));
    }

    /** Override to set customer role */
    delete(body): Promise<ServiceResponse> {
        return super.delete(this.checkBodyForRole(body));
    }

    /** Override to set customer role */
    findAll(): Promise<ServiceResponse> {
        return super.find(this.checkBodyForRole({}));
    }

    /** Override to set customer role */
    count(query = {}): Promise<ServiceResponse> {
        return super.count(this.checkBodyForRole(query));
    }

    /** Override to set customer role */
    findWithLimit(findParams, limit, offset = 0): Promise<ServiceResponse> {
        return super.findWithLimit(this.checkBodyForRole(findParams), limit, offset);
    }

    /** Override to set customer role */
    find(findParams): Promise<ServiceResponse> {
        return super.find(this.checkBodyForRole(findParams));
    }

    /**
     * Check if the role in the body is set to the customer role. Set it if not.
     * @param body The body
     * @returns {any} The updated body
     */
    checkBodyForRole(body) {
        if (!body.role || !( body.role === UserRoles.CUSTOMER )) body.role = UserRoles.CUSTOMER;
        return body;
    }

}