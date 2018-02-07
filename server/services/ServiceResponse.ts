/**
 * Ensures that there is a standard structure for service data return.
 * Allows us to test if the service failed and present any errors if there
 * were any. Otherwise we know we can use the data safely
 */
export default class ServiceResponse {

    /** Whether or not the service method failed */
    failed;

    /** The data returned */
    data;

    /** Any errors from the service */
    errors = [];

    /**
     * Handles a service response and sets the data or
     * error data depending on if it passed or failed
     *
     * @param failed If the response failed
     * @param {any} data The data to pass with it (null by default)
     */
    constructor(failed, data = null) {
        this.failed = failed;
        if (!failed) {
            this.data = data;
        } else {
            if (data) {
                if (data instanceof Array) {
                    this.errors = data;
                } else {
                    this.errors.push(data);
                }
            }
        }
    }

    /**
     * @returns {boolean} If the service call succeeded
     */
    isSuccess() {
        return !this.failed;
    }

    /**
     * @returns {boolean} If the service call failed
     */
    isFailed() {
        return this.failed;
    }

    /**
     * @returns {boolean} If the service data is empty
     */
    isEmpty() {
        return !this.data || (Array.isArray(this.data) && this.data.length === 0);
    }

}
