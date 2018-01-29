
export default class ServiceResponse {

    model; // JSON
    status;
    errors = [];

    constructor(status, model = null) {
        this.status = status;
        if (this.isSuccess()) {
            this.model = model;
        } else {
            if (model) {
                if (model instanceof Array) {
                    this.errors = model;
                } else {
                    this.errors.push(model);
                }
            }
        }
    }

    setResponse(responseObject) {
        if (this.isSuccess()) {
            return responseObject.status(this.status).json(this.model);
        }
        return responseObject.status(this.status).json(this.errors);
    }

    isSuccess () {
        return this.status >= 200 && this.status <= 226;
    }

    isFailed() {
        return this.status >= 400;
    }

    isEmpty() {
        return !this.model || (Array.isArray(this.model) && this.model.length === 0);
    }

}
