import User from '../models/User.model.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = user.generateToken();
    return res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            lastname: user.lastName,
            location: user.location,
            name: user.name,
            token
        }
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please privde credentials');
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnAuthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError('Invalid Credentials');
    }
    const token = user.generateToken();
    return res.status(StatusCodes.OK).json({
        user: {
            email: user.email,
            lastname: user.lastName,
            location: user.location,
            name: user.name,
            token
        }
    })
}

const updateUser = async (req, res) => {
    const { email, name, lastname, location } = req.body;
    if (!email || !name || !lastname || !location) {
        throw new BadRequestError('Please provide all values');
    }
    const user = await User.findOne({ _id: req.user.id });

    user.email = email;
    user.name = name;
    user.lastName = lastname;
    user.location = location;

    await user.save();
    const token = user.generateToken();
    return res.status(StatusCodes.OK).json({
        user: {
            email: user.email,
            lastname: user.lastName,
            location: user.location,
            name: user.name,
            token
        }
    });
};

export { login, register, updateUser };