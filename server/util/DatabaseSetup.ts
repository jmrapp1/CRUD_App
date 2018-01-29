import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import ServiceMapping from '../services/ServiceMapping';

export default class DatabaseSetup {

    db;

    setupDb(callback) {
        dotenv.load({ path: '.env' });
        mongoose.connect(process.env.MONGODB_URI);
        const db = mongoose.connection;
        (<any>mongoose).Promise = global.Promise;

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            this.db = db;
            ServiceMapping.createMapping();
            console.log("Connected to MongoDB");
            callback(db);
        });
    }

    close(done) {
        mongoose.connection.close(() => {
            if (done) {
                done();
            }
        });
    }

    before(done) {
        this.setupDb(db => {
            done();
        });
    }

    after(done = null) {
        this.db.close().then(() => {
            this.close(done);
        });
    }
}
