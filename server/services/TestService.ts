import Test from '../models/Test';
import DatabaseService from './DatabaseService';
import ServiceResponse from './ServiceResponse';

class TestService extends DatabaseService {

    model = Test;

    createTest(test: String) : Promise<ServiceResponse> {
        return this.insert({ test });
    }

}

export default new TestService();