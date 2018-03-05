import DatabaseService from './DatabaseService';
import ServiceResponse from './ServiceResponse';
import { Service } from 'typedi';
import { encode } from 'jwt-simple';
import Business from '../models/Business';

@Service()
export default class BusinessService extends DatabaseService {

    model = Business;

    validateRegister(name: string, street: string, city: string, state: string, zip: string): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            if (name && street && city && state && zip) {
                if (zip.length === 5 && zip.match(/^[0-9]+$/)) {
                    this.find({ name }).then(findRes => {
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
