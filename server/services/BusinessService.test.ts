import { expect } from 'chai';
import * as mocha from 'mocha';
import DatabaseSetup from '../util/DatabaseSetup';
import { Container } from 'typedi';
import BusinessService from './BusinessService';
import UserService from './UserService';
import { UserRoles } from '../models/User';

const dbSetup = new DatabaseSetup();
const businessService = Container.get(BusinessService);
const userService = Container.get(UserService);

describe('BusinessService', () => {

    before(function (done) {
        this.timeout(10000);
        dbSetup.setupTestDb(db => {
            businessService.delete({}).then(res => {
                expect(res.isFailed()).to.equal(false);
                done();
            });
        });
    });

    after(done => {
        businessService.delete({}).then(res => {
            expect(res.isFailed()).to.equal(false);
            done();
        });
    });

    describe('Register', () => {
        it('should not register without all form data', done => {
            businessService.register(undefined, 'asd', 'asda', 'asdasd', '123123').then(res => {
                expect(res.isFailed()).to.equal(true);
                expect(res.errors[ 0 ]).to.equal('Please enter information into all forms.');
                done();
            });
        });
        it('should not register with an incorrect zip code length', done => {
            businessService.register('test123', 'asd', 'asda', 'asdasd', '123123').then(res => {
                expect(res.isFailed()).to.equal(true);
                expect(res.errors[ 0 ]).to.equal('Please enter a valid zip code.');
                done();
            });
        });
        it('should not register with a non-numeric zip code', done => {
            businessService.register('test123', 'asd', 'asda', 'asdasd', '123a1').then(res => {
                expect(res.isFailed()).to.equal(true);
                expect(res.errors[ 0 ]).to.equal('Please enter a valid zip code.');
                done();
            });
        });
        it('should register successfully', done => {
            businessService.register('MyBusiness', 'asd', 'asda', 'asdasd', '12312').then(res => {
                expect(res.isFailed()).to.equal(false);
                done();
            });
        });
        it('should not register with an existing business name', done => {
            businessService.register('MyBusiness', 'asd', 'asda', 'asdasd', '12312').then(res => {
                expect(res.isFailed()).to.equal(true);
                expect(res.errors[ 0 ]).to.equal('That business name has already been used.');
                done();
            });
        });
    });

    describe('Attach Business To User', () => {
        it('should attach a business ID to the user', done => {
            businessService.register('TestBusiness', 'test', 'test', 'test', '12345').then(busRes => {
                expect(busRes.isSuccess()).to.equal(true);
                const business = busRes.data;
                userService.register('testbusinessuser@test.com', 'test', 'test', '1234567890', 'test123',
                    'test123', UserRoles.CUSTOMER, {}).then(userRes => {
                    expect(userRes.isSuccess()).to.equal(true);
                    const user = userRes.data;
                    businessService.attachBusinessToUser(user, business).then(attRes => {
                        expect(attRes.isSuccess()).to.equal(true);
                        userService.findById(user._id).then(findRes => {
                            expect(findRes.isSuccess() && !findRes.isEmpty()).to.equal(true);
                            expect(findRes.data.business._id.toString()).to.equal(business._id.toString());
                            done();
                        });
                    });
                });
            });
        });
    });
});
