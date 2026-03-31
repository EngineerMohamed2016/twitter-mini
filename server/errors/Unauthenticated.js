import httpStatusCodes from '../utils/status-codes.js'
export default class NotFound extends Error {
    constructor(msg) {
        super(msg);
        this.statusCode = httpStatusCodes.NOT_FOUND;
    }
}

