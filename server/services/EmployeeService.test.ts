import { expect } from 'chai';
import * as mocha from 'mocha';
import DatabaseSetup from '../util/DatabaseSetup';
import { Container } from 'typedi';
import { UserRoles } from '../models/User';
import EmployeeService from './EmployeeService';

const dbSetup = new DatabaseSetup();
const employeeService = Container.get(EmployeeService);

describe('EmployeeService', () => {

    before(function (done) {
        this.timeout(10000);
        dbSetup.setupTestDb(db => {
            employeeService.delete({}).then(res => {
                expect(res.isFailed()).to.equal(false);
                done();
            });
        });
    });

    after(done => {
        employeeService.delete({}).then(res => {
            expect(res.isFailed()).to.equal(false);
            done();
        });
    });

    describe('Ensure Employee Role', () => {
        it('should add employee role when not in body', () => {
            const body = employeeService.checkBodyForRole({});
            expect(body.role).to.equal(UserRoles.EMPLOYEE);
        });
        it('should change to employee role when in body but not employee', () => {
            const body = employeeService.checkBodyForRole({ role: 'fakerole' });
            expect(body.role).to.equal(UserRoles.EMPLOYEE);
        });
        it('should not do anything when role is employee', () => {
            const body = employeeService.checkBodyForRole({ role: UserRoles.EMPLOYEE });
            expect(body.role).to.equal(UserRoles.EMPLOYEE);
        });
    });

    describe('Register Employee', () => {
        it('should not register a new employee with negative pay rate', done => {
            employeeService.register('test123@test.com', 'Bob', 'Joe', '1112223333',
                'test123', 'test123', -1, false, false, false,
                false, false, false, false).then(res => {
                expect(res.isFailed()).to.equal(true);
                expect(res.errors[ 0 ]).to.equal('Please enter a pay rate.');
                done();
            });
        });
        it('should not register a new employee with an undefined work schedule', done => {
            employeeService.register('test123@test.com', 'Bob', 'Joe', '1112223333',
                'test123', 'test123', 12.50, false, false, false,
                false, false, undefined, false).then(res => {
                expect(res.isFailed()).to.equal(true);
                expect(res.errors[ 0 ]).to.equal('Please enter the days the employee works.');
                done();
            });
        });
        it('should register a new employee', done => {
            employeeService.register('test123@test.com', 'Bob', 'Joe', '1112223333',
                'test123', 'test123', 12.50, false, false, false,
                false, false, false, false).then(res => {
                expect(res.isSuccess()).to.equal(true);
                employeeService.find({ email: 'test123@test.com' }).then(findRes => {
                    expect(findRes.isSuccess() && !findRes.isEmpty()).to.equal(true);
                    const user = findRes.data[ 0 ];
                    expect(user.profile.payRate).to.equal(12.50);
                    expect(user.role).to.equal(UserRoles.EMPLOYEE);
                    done();
                });
            });
        });
    });

    describe('Find', () => {
        it('should only find employees', done => {
            employeeService.register('test1234@test.com', 'Bob', 'Joe', '1112223333',
                'test123', 'test123', 12.50, false, false, false,
                false, false, false, false).then(res1 => {
                expect(res1.isSuccess()).to.equal(true);
                employeeService.register('test1235@test.com', 'Bob', 'Joe', '1112223333',
                    'test123', 'test123', 12.50, false, false, false,
                    false, false, false, false).then(res2 => {
                    expect(res2.isSuccess()).to.equal(true);
                    employeeService.findAll().then(allRes => {
                        expect(allRes.isSuccess()).to.equal(true);
                        expect(allRes.data.length).to.equal(3);
                        done();
                    });
                });
            });
        });
    });

});
