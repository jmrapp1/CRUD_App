import { expect } from 'chai';
import * as mocha from 'mocha';
import DatabaseSetup from '../util/DatabaseSetup';
import { Container } from 'typedi';
import UserService from './UserService';
import { UserRoles } from '../models/User';

const dbSetup = new DatabaseSetup();
const userService = Container.get(UserService);

describe.only('UserService', () => {

    before(function (done) {
        this.timeout(10000);
        dbSetup.setupTestDb(db => {
            userService.delete({}).then(res => {
                expect(res.isFailed()).to.equal(false);
                done();
            });
        });
    });

    after(done => {
        userService.delete({}).then(res => {
            expect(res.isFailed()).to.equal(false);
            done();
        });
    });

    describe('UserRoleValid', () => {
        it('Should validate a correct user role', () => {
            expect(userService.userRoleValid(UserRoles.CUSTOMER)).to.equal(true);
        });
        it('Should not validate an incorrect user role', () => {
            expect(userService.userRoleValid('FakeRole')).to.equal(false);
        });
    });

    describe('Register', () => {
        describe('Email', () => {
            it('Should not validate when email is not valid', done => {
                userService.register('testemail', 'bob', 'joe', 'phone', 'password', 'password', UserRoles.CUSTOMER, {}).then(res => {
                    expect(res.isFailed()).to.equal(true);
                    expect(res.errors[ 0 ]).to.equal('Please enter a valid email.');
                    done();
                });
            });
            it('Should validate when email is valid', done => {
                userService.register('testemail@google.com', 'bob', 'joe', 'phone', 'password', 'password', UserRoles.CUSTOMER, {}).then(res => {
                    expect(res.errors[ 0 ]).to.not.equal('Please enter a valid email.');
                    done();
                });
            });
            it('Should not validate when email is not unique', done => {
                const email = 'testemail123@test.com';
                userService.insert({
                    email,
                    firstName: 'Test',
                    lastName: 'Test',
                    phone: '1112223333',
                    password: 'password',
                    role: UserRoles.CUSTOMER
                }).then(res => {
                    expect(res.isSuccess()).to.equal(true);
                    userService.register(email, 'bob', 'joe', '1112223333', 'password', 'password', UserRoles.CUSTOMER, {}).then(res2 => {
                        expect(res2.errors[ 0 ]).to.equal('That email has already been used.');
                        done();
                    });
                });
            });
        });
        describe('Password', () => {
            it('Should not validate when password is less than 6 characters', done => {
                userService.register('testemail@google.com', 'bob', 'joe', 'phone', 'test', 'test', UserRoles.CUSTOMER, {}).then(res => {
                    expect(res.isFailed()).to.equal(true);
                    expect(res.errors[ 0 ]).to.equal('Please enter a password at least 6 characters long.');
                    done();
                });
            });
            it('Should validate when password is at least 6 characters', done => {
                userService.register('testemail@google.com', 'bob', 'joe', '1112223333', 'password', 'password', UserRoles.CUSTOMER, {}).then(res => {
                    expect(res.errors[ 0 ]).to.not.equal('Please enter a password at least 6 characters long.');
                    done();
                });
            });
            it('Should not validate when password does not match confirm password', done => {
                userService.register('testemail@google.com', 'bob', 'joe', 'phone', 'teasdasda', 'asdasdsv', UserRoles.CUSTOMER, {}).then(res => {
                    expect(res.isFailed()).to.equal(true);
                    expect(res.errors[ 0 ]).to.equal('Please make sure the passwords match.');
                    done();
                });
            });
            it('Should validate when password matches confirm password', done => {
                userService.register('testemail@google.com', 'bob', 'joe', '1112223333', 'password', 'password', UserRoles.CUSTOMER, {}).then(res => {
                    expect(res.errors[ 0 ]).to.not.equal('Please make sure that passwords match.');
                    done();
                });
            });
        });
        describe('Phone', () => {
            it('Should not validate when phone is not valid', done => {
                userService.register('testemail@google.com', 'bob', 'joe', 'phone', 'password', 'password', UserRoles.CUSTOMER, {}).then(res => {
                    expect(res.isFailed()).to.equal(true);
                    expect(res.errors[ 0 ]).to.equal('Please enter a valid phone number.');
                    done();
                });
            });
            it('Should validate when phone is valid', done => {
                userService.register('testemail@google.com', 'bob', 'joe', '1112223333', 'password', 'password', UserRoles.CUSTOMER, {}).then(res => {
                    expect(res.errors[ 0 ]).to.not.equal('Please enter a valid phone number.');
                    done();
                });
            });
            it('Should not validate when phone contains non-numeric characters', done => {
                userService.register('testemail@google.com', 'bob', 'joe', '111222333a', 'password', 'password', UserRoles.CUSTOMER, {}).then(res => {
                    expect(res.isFailed()).to.equal(true);
                    expect(res.errors[ 0 ]).to.equal('Please enter a valid phone number.');
                    done();
                });
            });
            it('Should validate when phone contains only non-numeric numbers', done => {
                userService.register('testemail@google.com', 'bob', 'joe', '1112223333', 'password', 'password', UserRoles.CUSTOMER, {}).then(res => {
                    expect(res.errors[ 0 ]).to.not.equal('Please enter a valid phone number.');
                    done();
                });
            });
        });
        describe('Role', () => {
            it('Should not validate when role is not valid', done => {
                userService.register('testemail@google.com', 'bob', 'joe', '1112223333', 'password', 'password', 'fakerole', {}).then(res => {
                    expect(res.isFailed()).to.equal(true);
                    expect(res.errors[ 0 ]).to.equal('Please select a valid role.');
                    done();
                });
            });
            it('Should validate when phone is valid', done => {
                userService.register('testemail@google.com', 'bob', 'joe', '1112223333', 'password', 'password', UserRoles.EMPLOYEE, {}).then(res => {
                    expect(res.errors[ 0 ]).to.not.equal('Please select a valid role.');
                    done();
                });
            });
        });
        it('Should register a user', done => {
            userService.register('test123@test.com', 'bob', 'joe', '1112223333', 'password', 'password', UserRoles.CUSTOMER, {}).then(res => {
                expect(res.isSuccess()).to.equal(true);
                done();
            });
        });
    });

    describe('Login', () => {
        it('Should not validate when email is not valid', done => {
            userService.register('testemail', 'bob', 'joe', 'phone', 'password', 'password', UserRoles.CUSTOMER, {}).then(res => {
                expect(res.isFailed()).to.equal(true);
                expect(res.errors[ 0 ]).to.equal('Please enter a valid email.');
                done();
            });
        });
        it('Should validate when email is valid', done => {
            userService.register('testemail@google.com', 'bob', 'joe', 'phone', 'password', 'password', UserRoles.CUSTOMER, {}).then(res => {
                expect(res.errors[ 0 ]).to.not.equal('Please enter a valid email.');
                done();
            });
        });
        it ('Should not log in with non-matching email & password', done => {
            userService.login('fakeemail@test.com', 'test123').then(res => {
                expect(res.isFailed()).to.equal(true);
                expect(res.errors[ 0 ]).to.equal('The email or password is incorrect.');
                done();
            });
        });
        it('Should log in with matching email & password', done => {
            const email = 'thisisalogintest@test.com';
            const password = 'password';
            userService.insert({
                email,
                firstName: 'Test',
                lastName: 'Test',
                phone: '1112223333',
                password,
                role: UserRoles.CUSTOMER
            }).then(res => {
                expect(res.isSuccess()).to.equal(true);
                userService.login(email, password).then(loginRes => {
                    expect(loginRes.isFailed()).to.equal(false);
                    expect(loginRes.data.token).to.not.equal(undefined);
                    done();
                });
            });
        });
    });
});
