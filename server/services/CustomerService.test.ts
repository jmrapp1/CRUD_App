import { expect } from 'chai';
import * as mocha from 'mocha';
import DatabaseSetup from '../util/DatabaseSetup';
import { Container } from 'typedi';
import { UserRoles } from '../models/User';
import EmployeeService from './EmployeeService';
import CustomerService from './CustomerService';

const dbSetup = new DatabaseSetup();
const customerService = Container.get(CustomerService);

describe('CustomerService', () => {

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

});
