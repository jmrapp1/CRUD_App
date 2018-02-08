import ServiceResponse from './ServiceResponse';

export default abstract class DatabaseService {

    /**
     * Represents the database model to be used
     */
    abstract model: any;

    // Insert
    insert(body): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            this.model.create(body, (err, model) => {
                if (err) {
                    return resolve(new ServiceResponse(true, err));
                }
                return resolve(new ServiceResponse(false, model));
            });
        });
    };

    // Delete all
    delete(body): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            this.model.remove(body, err => {
                if (err) {
                    return resolve(new ServiceResponse(true, err));
                }
                return resolve(new ServiceResponse(false));
            });
        });
    }

    findById(id): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            this.model.find({ _id: id }).limit(1).exec((err, model) => {
                if (err) {
                    return resolve(new ServiceResponse(true, err));
                }
                if (model instanceof Array && model.length === 1) {
                    return resolve(new ServiceResponse(false, model[0]));
                }
                return resolve(new ServiceResponse(false, model));
            });
        });
    }

    findAll(): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            this.model.find({}).exec((err, models) => {
                if (err) {
                    return resolve(new ServiceResponse(true, err));
                }
                return resolve(new ServiceResponse(false, models));
            });
        });
    }

    // Count all
    count(query = {}): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            this.model.count(query).exec((err, count) => {
                if (err) {
                    return resolve(new ServiceResponse(true, err));
                }
                return resolve(new ServiceResponse(false, count));
            });
        });
    };

    findWithLimit(findParams, limit): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            this.model.find(findParams).limit(limit).exec((err, models) => {
                if (err) {
                    return resolve(new ServiceResponse(true, err));
                }
                return resolve(new ServiceResponse(false, models));
            });
        });
    }

    find(findParams): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            this.model.find(findParams).exec((err, models) => {
                if (err) {
                    return resolve(new ServiceResponse(true, err));
                }
                return resolve(new ServiceResponse(false, models));
            });
        });
    }

    // Update by id
    updateById(id, body): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            this.model.findOneAndUpdate({ _id: id }, body).exec((err, model) => {
                if (err) {
                    return resolve(new ServiceResponse(true, err));
                }
                return resolve(new ServiceResponse(false, model));
            });
        });
    }

    // Delete by id
    deleteById(id): Promise<ServiceResponse> {
        return new Promise<ServiceResponse>(resolve => {
            this.model.findOneAndRemove({ _id: id }, (err, model) => {
                if (err) {
                    return resolve(new ServiceResponse(true, err));
                }
                return resolve(new ServiceResponse(false, model));
            });
        });
    }

}