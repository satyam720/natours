import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import AppError from './Utils/appError.js';
import { globalErrorHandler } from './controllers/errorController.js';

const fileUrl = fileURLToPath(import.meta.url);
const __dirname = dirname(fileUrl);

import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';


const app = express();
app.set('query parser', 'extended');

// Global Middleware
app.use(morgan('dev'));

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, Please try again in an hour!"  
});

app.use('/api', limiter);

app.use(express.json());
app.use(express.static('public'));
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// Routes
app.get('/api/config', (req, res) => {
    res.json({
        mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN
    });
});
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all(/.*/, (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
