import { expect } from 'chai';
import * as mocha from 'mocha';
import DatabaseSetup from '../util/DatabaseSetup';
import { Container } from 'typedi';
import { UserRoles } from '../models/User';
import ManagerService from './ManagerService';

const dbSetup = new DatabaseSetup();
const managerService = Container.get(ManagerService);

describe('ManagerService', () => {

    before(function (done) {
        this.timeout(10000);
        dbSetup.setupTestDb(db => {
            managerService.delete({}).then(res => {
                expect(res.isFailed()).to.equal(false);
                done();
            });
        });
    });

    after(done => {
        managerService.delete({}).then(res => {
            expect(res.isFailed()).to.equal(false);
            done();
        });
    });

    describe('Ensure Manager Role', () => {
        it('should add manager role when not in body', () => {
            const body = managerService.checkBodyForRole({});
            expect(body.role).to.equal(UserRoles.MANAGER);
        });
        it('should change to manager role when in body but not manager', () => {
            const body = managerService.checkBodyForRole({ role: 'fakerole' });
            expect(body.role).to.equal(UserRoles.MANAGER);
        });
        it('should not do anything when role is manager', () => {
            const body = managerService.checkBodyForRole({ role: UserRoles.MANAGER });
            expect(body.role).to.equal(UserRoles.MANAGER);
        });
    });

    describe('Register Manager', () => {
        it('should not register a new manager with an undefined work schedule', done => {
            managerService.register('testmanager123@test.com', 'Bob', 'Joe', '1112223333',
                'test123', 'test123', 5, false, false, false,
                false, false, undefined, false).then(res => {
                expect(res.isFailed()).to.equal(true);
                expect(res.errors[ 0 ]).to.equal('Please enter the days the manager works.');
                done();
            });
        });
        it('should register a new manager', done => {
            managerService.register('testmanager123@test.com', 'Bob', 'Joe', '1112223333',
                'test123', 'test123', 5, false, false, false,
                false, false, false, false).then(res => {
                expect(res.isSuccess()).to.equal(true);
                managerService.find({ email: 'testmanager123@test.com' }).then(findRes => {
                    expect(findRes.isSuccess() && !findRes.isEmpty()).to.equal(true);
                    const user = findRes.data[ 0 ];
                    expect(user.role).to.equal(UserRoles.MANAGER);
                    done();
                });
            });
        });
    });

    describe('Find', () => {
        it('should only find managers', done => {
            managerService.register('testmanager1234@test.com', 'Bob', 'Joe', '1112223333',
                'test123', 'test123', 5, false, false, false,
                false, false, false, false).then(res1 => {
                expect(res1.isSuccess()).to.equal(true);
                managerService.register('testmanager1235@test.com', 'Bob', 'Joe', '1112223333',
                    'test123', 'test123', 5, false, false, false,
                    false, false, false, false).then(res2 => {
                    expect(res2.isSuccess()).to.equal(true);
                    managerService.findAll().then(allRes => {
                        expect(allRes.isSuccess()).to.equal(true);
                        expect(allRes.data.length).to.equal(3);
                        done();
                    });
                });
            });
        });
    });

});
