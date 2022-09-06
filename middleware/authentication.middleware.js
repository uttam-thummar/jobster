import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors/index.js';

const AuthenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnAuthenticatedError('Authentication Failed');
    }
    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const testUser = payload.id === '62f801d0510a7c1ed2312d52';
        req.user = { id: payload.id, testUser }
        next();
    } catch (error) {
        throw new UnAuthenticatedError('Authentication Failed');
    }
};

export default AuthenticationMiddleware;