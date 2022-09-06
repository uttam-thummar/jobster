import { StatusCodes } from 'http-status-codes';

const ErrorHandlerMiddleware = (err, req, res, next) => {
    let errorDefaults = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, please try again later.'
    }

    if (err.name === 'ValidationError') {
        errorDefaults.msg = Object.values(err.errors).map(item => item.message).join(', ');
        errorDefaults.statusCode = StatusCodes.BAD_REQUEST;
    }
    if (err.code && err.code === 11000) {
        errorDefaults.msg = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, please choose another value`
        errorDefaults.statusCode = StatusCodes.BAD_REQUEST
    }
    if (err.name === 'CastError') {
        errorDefaults.msg = `No item found with id : ${err.value}`
        errorDefaults.statusCode = StatusCodes.NOT_FOUND;
    }

    return res.status(errorDefaults.statusCode).json({ msg: errorDefaults.msg });
}

export default ErrorHandlerMiddleware;