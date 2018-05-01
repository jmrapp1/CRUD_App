import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Appointment from '../models/Appointment';
import Business from '../models/Business';
import Product from '../models/Product';
import Sale from '../models/Sale';
import Service from '../models/Service';
import Test from '../models/Test';
import User from '../models/User';

export default class DatabaseSetup {

    db;

    /**
     * Setups the database and connects to the MongoDB Database
     * @param callback Function to call when finished
     */
    setupDb(callback) {
        dotenv.load({ path: '.env' });
        this.connectToDb(callback, process.env.MONGODB_URI);
    }

    /**
     * Setups the test database and connects to the MongoDB Test Database
     * @param callback Function to call when finished
     */
    setupTestDb(callback) {
        dotenv.load({ path: '.env' });
        this.connectToDb(() => {
            this.removeTestData(callback);
        }, process.env.MONGODB_TEST_URI);
    }

    /**
     * Deletes all test data from the database
     * @param callback Function to call when finished
     */
    removeTestData(callback) {
        Appointment.remove({}).exec(() =>
            Business.remove({}).exec(() =>
                Product.remove({}).exec(() =>
                    Sale.remove({}).exec(() =>
                        Service.remove({}).exec(() =>
                            Test.remove({}).exec(() =>
                                User.remove({}).exec(() =>
                                    callback()
                                )
                            )
                        )
                    )
                )
            )
        );
    }

    /**
     * Connects to a db with some url
     * @param callback The function to call when connected
     * @param uri The url to connect to
     */
    connectToDb(callback, uri) {
        mongoose.connect(uri);
        const db = mongoose.connection;
        ( <any>mongoose ).Promise = global.Promise;

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            this.db = db;
            console.log('Connected to MongoDB');
            callback(db);
        });
    }

    /**
     * Closes the existing connection
     * @param done The function to call when finished
     */
    close(done) {
        mongoose.connection.close(() => {
            if (done) {
                done();
            }
        });
    }

    /**
     * Used in tests to setup the database before they run
     * @param done Function to call when done
     */
    before(done) {
        this.setupDb(db => {
            done();
        });
    }

    /**
     * Used in tests to close the database after they run
     * @param done Function to call when done
     */
    after(done = null) {
        this.db.close().then(() => {
            this.close(done);
        });
    }
}
