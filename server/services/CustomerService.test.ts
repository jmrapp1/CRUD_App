import { expect } from 'chai';
import * as mocha from 'mocha';
import DatabaseSetup from '../util/DatabaseSetup';
import { Container } from 'typedi';
import { UserRoles } from '../models/User';
import EmployeeService from './EmployeeService';
import CustomerService from './CustomerService';

const dbSetup = new DatabaseSetup();
const customerService = Container.get(CustomerService);

describe.only('CustomerService', () => {

    before(function (done) {
        this.timeout(10000);
        dbSetup.setupTestDb(db => {
            customerService.delete({}).then(res => {
                expect(res.isFailed()).to.equal(false);
                done();
            });
        });
    });

    after(done => {
        customerService.delete({}).then(res => {
            expect(res.isFailed()).to.equal(false);
            done();
        });
    });

    describe('Ensure Customer Role', () => {
        it('should add customer role when not in body', () => {
            const body = customerService.checkBodyForRole({});
            expect(body.role).to.equal(UserRoles.CUSTOMER);
        });
        it('should change to customer role when in body but not customer', () => {
            const body = customerService.checkBodyForRole({ role: 'fakerole' });
            expect(body.role).to.equal(UserRoles.CUSTOMER);
        });
        it('should not do anything when role is customer', () => {
            const body = customerService.checkBodyForRole({ role: UserRoles.CUSTOMER });
            expect(body.role).to.equal(UserRoles.CUSTOMER);
        });
    });

    describe('Register Customer', () => {
        it('should register a new customer', done => {
            customerService.register('testcustomer123@test.com', 'Bob', 'Joe', '1112223333',
                'test123', 'test123').then(res => {
                expect(res.isSuccess()).to.equal(true);
                customerService.find({ email: 'testcustomer123@test.com' }).then(findRes => {
                    expect(findRes.isSuccess() && !findRes.isEmpty()).to.equal(true);
                    const user = findRes.data[ 0 ];
                    expect(user.email).to.equal('testcustomer123@test.com');
                    expect(user.role).to.equal(UserRoles.CUSTOMER);
                    done();
                });
            });
        });
    });

    describe('Find', () => {
        it('should only find customer', done => {
            customerService.register('testcustomer1234@test.com', 'Bob', 'Joe', '1112223333',
                'test123', 'test123').then(res1 => {
                expect(res1.isSuccess()).to.equal(true);
                customerService.register('testcustomer12345@test.com', 'Bob', 'Joe', '1112223333',
                    'test123', 'test123').then(res2 => {
                    expect(res2.isSuccess()).to.equal(true);
                    customerService.findAll().then(allRes => {
                        expect(allRes.isSuccess()).to.equal(true);
                        expect(allRes.data.length).to.equal(3);
                        done();
                    });
                });
            });
        });
    });

});
