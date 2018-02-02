import { expect } from 'chai';
import TestService from './TestService';
import DatabaseSetup from '../util/DatabaseSetup';


const dbSetup = new DatabaseSetup();

describe('BaseService', () => {

    before(done => {
        dbSetup.setupDb(db => {
            TestService.delete({}).then(res => {
                expect(res.isFailed()).to.equal(false);
                done();
            });
        });
    });

    after(done => {
        TestService.delete({}).then(res => {
            expect(res.isFailed()).to.equal(false);
            done();
        });
    });

    describe('Insert', () => {
        it('Should insert a test document', done => {
            const test = 'this is a unit test test';
            TestService.insert({ test }).then(res => {
                expect(res.isFailed()).to.equal(false);
                expect(res.data.test).to.equal(test);
                done();
            });
        });
    });

    describe('Delete', () => {
        it('Should insert and then delete a test document', done => {
            const test = 'this is a unit test test again';
            TestService.insert({ test }).then(res => {
                expect(res.isFailed()).to.equal(false);
                expect(res.data.test).to.equal(test);
                const id = res.data._id;
                TestService.deleteById(id).then(res2 => {
                    expect(res2.isFailed()).to.equal(false);
                    expect(res2.data.test).to.equal(test);
                    done();
                });
            });
        });
    });

    describe('FindById', () => {
        it('Should insert and then find the test document by its ID', done => {
            const test = 'this is a unit test test again';
            TestService.insert({ test }).then(res => {
                expect(res.isFailed()).to.equal(false);
                expect(res.data.test).to.equal(test);
                const id = res.data._id.toString();
                TestService.findById(id).then(res2 => {
                    expect(res2.isFailed()).to.equal(false);
                    expect(res2.data._id.toString()).to.equal(id);
                    expect(res2.data.test).to.equal(test);
                    done();
                });
            });
        });
    });

    describe('Find All', () => {
        it('Should find all documents', done => {
            const test = 'this is a unit test test again again';
            TestService.insert({ test }).then(res => {
                expect(res.isFailed()).to.equal(false);
                expect(res.data.test).to.equal(test);
                TestService.findAll().then(res2 => {
                    expect(res2.isFailed()).to.equal(false);
                    expect(res2.data.length).to.equal(3);
                    done();
                });
            });
        });
    });

    describe('Count', () => {
        it('Should find the number of all documents', done => {
            TestService.count().then(res => {
                expect(res.isFailed()).to.equal(false);
                expect(res.data).to.equal(3);
                done();
            });
        });
    });

    describe('Find With A Limit', () => {
        it('Should find a limited number of documents', done => {
            TestService.count().then(res => {
                expect(res.isFailed()).to.equal(false);
                expect(res.data).to.equal(3);
                TestService.findWithLimit({}, 2).then(res => {
                    expect(res.isFailed()).to.equal(false);
                    expect(res.data.length).to.equal(2);
                    done();
                });
            });
        });
    });

    describe('Find By Key', () => {
        it('Should find document by key', done => {
            const test = 'this is a unit test test again again again';
            TestService.insert({ test }).then(res => {
                expect(res.isFailed()).to.equal(false);
                expect(res.data.test).to.equal(test);
                const id = res.data._id.toString();
                TestService.find({ test }).then(res2 => {
                    expect(res2.isFailed()).to.equal(false);
                    expect(res2.isEmpty()).to.equal(false);
                    expect(res2.data.length).to.equal(1);
                    expect(res2.data[0]._id.toString()).to.equal(id);
                    done();
                });
            });
        });
    });

    describe('Find By Key', () => {
        it('Should find document by key', done => {
            const testOne = 'this is a unit test update 1';
            const testTwo = 'this is a unit test update 2';
            TestService.insert({ test: testOne }).then(res => {
                expect(res.isFailed()).to.equal(false);
                expect(res.data.test).to.equal(testOne);
                const id = res.data._id.toString();
                TestService.updateById(id, { test: testTwo }).then(res2 => {
                    expect(res2.isFailed()).to.equal(false);
                    TestService.findById(id).then(res3 => {
                        expect(res3.isFailed()).to.equal(false);
                        expect(res3.data._id.toString()).to.equal(id);
                        expect(res3.data.test).to.equal(testTwo);
                        done();
                    });
                });
            });
        });
    });

    describe('Delete By ID', () => {
        it('Should delete by ID', done => {
            const test = 'this is a unit test for delete';
            TestService.insert({ test }).then(res => {
                expect(res.isFailed()).to.equal(false);
                expect(res.data.test).to.equal(test);
                const id = res.data._id.toString();
                TestService.deleteById(id).then(res2 => {
                    expect(res2.isFailed()).to.equal(false);
                    TestService.findById(id).then(res3 => {
                        expect(res3.isFailed()).to.equal(false);
                        expect(res3.isEmpty()).to.equal(true);
                        done();
                    });
                });
            });
        });
    });

});
