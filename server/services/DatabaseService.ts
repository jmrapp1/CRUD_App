import ServiceResponse from './ServiceResponse';
import * as _ from 'lodash';

export default abstract class DatabaseService {

    /**
     * Represents the database model to be used
     */
    populate = [];
    abstract model: any;

    // Insert
    insert(body): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            this.model.create(body, (err, model) => resolve(this.handleStandardResponse(err, model)));
        });
    };

    // Delete all
    delete(body): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            this.model.remove(body, err => {
                if (err && !_.isEmpty(err)) {
                    return resolve(new ServiceResponse(true, err));
                }
                return resolve(new ServiceResponse(false));
            });
        });
    }

    findById(id, populate = this.populate): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            this.populateQuery(this.model.find({ _id: id }).limit(1), populate).exec((err, model) => {
                if (err && !_.isEmpty(err)) {
                    return resolve(new ServiceResponse(true, err));
                }
                if (model instanceof Array && model.length === 1) {
                    return resolve(new ServiceResponse(false, model[0]));
                }
                return resolve(new ServiceResponse(false, model));
            });
        });
    }

    private populateQuery(query, populate) {
        if (populate instanceof Array) {
            for (let i = 0; i < populate.length; i++) {
                query.populate(populate[i]);
            }
        } else if (populate && populate != null) {
            query.populate(populate);
        }
        return query;
    }

    findAll(populate = this.populate): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve =>
            this.populateQuery(this.model.find({}), populate).exec((err, models) => resolve(this.handleStandardResponse(err, models)))
        );
    }

    // Count all
    count(query = {}): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve =>
            this.model.count(query).exec((err, count) => resolve(this.handleStandardResponse(err, count)))
        );
    };

    findWithLimit(findParams, limit, offset = 0, populate = this.populate): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve =>
            this.populateQuery(this.model.find(findParams).skip(offset).limit(limit), populate).exec((err, models) => resolve(this.handleStandardResponse(err, models)))
        );
    }

    find(findParams, populate = this.populate): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve =>
            this.populateQuery(this.model.find(findParams), populate).exec((err, models) => resolve(this.handleStandardResponse(err, models)))
        );
    }

    // Update by id
    updateById(id, body): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            this.findById(id).then(modelRes => {
                if (modelRes.isSuccess() && !modelRes.isEmpty()) {
                    modelRes.data.update(body, err => resolve(this.handleStandardResponse(err)));
                } else {
                    return resolve(modelRes);
                }
            });
        });
    }

    // Delete by id
    deleteById(id): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve =>
            this.model.findOneAndRemove({ _id: id }, (err, model) => resolve(this.handleStandardResponse(err, model)))
        );
    }

    handleStandardResponse(err, model = null): ServiceResponse {
        if (err && !_.isEmpty(err)) {
            return new ServiceResponse(true, err);
        }
        return new ServiceResponse(false, model);
    }

}