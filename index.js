import express from 'express';
import 'express-async-errors'
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
// connect-db
import connectDB from './db/connect.js';
// routes
import authRouter from './routes/auth.routes.js';
import jobRouter from './routes/jobs.routes.js';
// middleware
import NotFoundMiddleware from './middleware/not-found.middleware.js';
import ErrorHandlerMiddleware from './middleware/error-handler.middleware.js';
import AuthenticationMiddleware from './middleware/authentication.middleware.js';
// external security packages
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';

const app = express();
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
// inbuild middleware
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.json());
// extrnal packages
app.use(cors());
app.set('trust proxy', 1);
app.use(helmet());
app.use(xss());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', AuthenticationMiddleware, jobRouter);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
})

// middlewares
app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);



const PORT = process.env.PORT || 5500;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server is listening to: ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();