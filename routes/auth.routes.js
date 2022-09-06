import express from "express";
import { login, register, updateUser } from "../controllers/auth.controllers.js";
import rateLimiter from 'express-rate-limit';
import AuthenticationMiddleware from "../middleware/authentication.middleware.js";
import TestuserMiddleware from "../middleware/testuser.middleware.js";

const router = express.Router();

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        msg: 'Too many requests from this IP, please try again after 15 minutes',
    },
});

router.post('/register', apiLimiter, register);
router.post('/login', apiLimiter, login);
router.patch('/update-user', AuthenticationMiddleware, TestuserMiddleware, updateUser)

export default router;