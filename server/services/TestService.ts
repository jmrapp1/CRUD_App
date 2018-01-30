import Test from '../models/Test';

class TestService {

    createTest(test: String) : Promise<Boolean> {
        return new Promise<Boolean>(resolve => {
            Test.create({ test }, (err, model) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

}

export default new TestService();