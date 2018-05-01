import Test from '../models/Test';
import DatabaseService from './DatabaseService';
import ServiceResponse from './ServiceResponse';
import { Service } from 'typedi';

@Service()
export default class TestService extends DatabaseService {

    model = Test;

    /**
     * Creates a test entry in the database
     * @param {String} test Test message
     * @returns {Promise<ServiceResponse>} if it was inserted correctly or not
     */
    createTest(test: String): Promise<ServiceResponse> {
        return this.insert({ test });
    }

}