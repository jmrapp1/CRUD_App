import DatabaseService from './DatabaseService';
import ServiceResponse from './ServiceResponse';
import { Service } from 'typedi';
import { encode } from 'jwt-simple';
import Business from '../models/Business';

@Service()
export default class BusinessService extends DatabaseService {

    model = Business;

    /**
     * Validates the register data to make sure it fits all constraints to register a business
     * This does not perform any insertion operations.
     *
     * @param {string} name The name of business. Must be unique
     * @param {string} street The street
     * @param {string} city The city
     * @param {string} state The state
     * @param {string} zip The zip
     * @returns {Promise<ServiceResponse>} Contains whether or not the data passed and any errors if it did not.
     */
    validateRegister(name: string, street: string, city: string, state: string, zip: string): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            if (name && street && city && state && zip) {
                if (zip.length === 5 && zip.match(/^[0-9]+$/)) {
                    this.find({ name }).then(findRes => {
                        console.log('Find: ' + JSON.stringify(findRes));
                        if (findRes.isEmpty()) {
                            return resolve(new ServiceResponse(false));
                        } else {
                            return resolve(new ServiceResponse(true, 'That business name has already been used.'));
                        }
                    });
                } else {
                    return resolve(new ServiceResponse(true, 'Please enter a valid zip code.'));
                }
            } else {
                return resolve(new ServiceResponse(true, 'Please enter information into all forms.'));
            }
        });
    }

    /**
     * Takes data for a new business and registers it if it passes all constraints
     *
     * @param {string} name The name of business. Must be unique
     * @param {string} street The street
     * @param {string} city The city
     * @param {string} state The state
     * @param {string} zip The zip
     * @returns {Promise<ServiceResponse>} Contains whether or not the business passed and any errors if it did not.
     */
    register(name: string, street: string, city: string, state: string, zip: string): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            this.validateRegister(name, street, city, state, zip).then(valRes => {
                if (valRes.isSuccess()) {
                    this.insert({ name, street, city, state, zip }).then(createRes => {
                        return resolve(createRes);
                    });
                } else {
                    return resolve(valRes);
                }
            })
        });
    }

    /**
     * Links a user database entry to a business ID
     *
     * @param user The user row object
     * @param business The business (either ID or row entry)
     * @returns {Promise<ServiceResponse>}
     */
    attachBusinessToUser(user, business) {
        return new Promise<ServiceResponse>(resolve => {
            let businessId = business;
            if (business[ '_id' ]) {
                businessId = business[ '_id' ];
            }
            user.business = businessId;
            user.save().then(updatedUser => resolve(new ServiceResponse(false, updatedUser)));
        });
    }

}
