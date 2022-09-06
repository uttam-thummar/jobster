import { BadRequestError } from "../errors/index.js"

const TestuserMiddleware = (req, res, next) => {
    if (req.user.testUser) {
        throw new BadRequestError('Test User, ReadOnly');
    }
    next();
}

export default TestuserMiddleware;