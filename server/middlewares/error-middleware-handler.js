import httpStatusCodes from '../utils/status-codes.js'

const errorHandler = (err, req, res, next) => {
    // err.statusCode ==> comes from error class
    // check if custom-error comes from class, if not, i will set default ==> StatusCodes.INTERNAL_SERVER_ERROR  && 'There is an error!'
    let error = { status: err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR, msg: err.message || 'There is an error!' };

    // mongoose validation while create(), error ==> minlength error |or| required
    if (err.name === 'ValidationError') {
        const errorMsg = Object.values(err.errors).map(obj => obj.message).join(', ');
        error.msg = errorMsg;
        error.status = httpStatusCodes.BAD_REQUEST;
    }

    // in register ==> duplicted email error
    // errors come from async-await && jwt.verify() automatically
    // duplicated email
    if (err.code === 11000) {
        const errorMsg = `duplicated ${Object.keys(err.keyValue).join('')} (${Object.values(err.keyValue)}), Please choose another value.`;
        error.msg = errorMsg;
        error.status = httpStatusCodes.BAD_REQUEST;
    }

    // while deleteing post
    if (err.name === 'CastError') {
        error.msg = 'Provide a valid postId';
        error.status = httpStatusCodes.CONFLICT;
    }

    // now send response
    res.status(error.status).json({ success: false, 'errorMsg': error.msg });


}

export default errorHandler