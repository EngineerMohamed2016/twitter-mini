import httpStatusCodes from '../utils/status-codes.js'

export default class BadRequest extends Error {
    constructor(message) {
        super(message);
        this.statusCode = httpStatusCodes.BAD_REQUEST;
    }
}

