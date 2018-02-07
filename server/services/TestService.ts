import Test from '../models/Test';
import DatabaseService from './DatabaseService';
import ServiceResponse from './ServiceResponse';
import { Service } from 'typedi';

@Service()
export default class TestService extends DatabaseService {

    model = Test;

    createTest(test: String): Promise<ServiceResponse> {
        return this.insert({ test });
    }

}