import express from 'express';
import { authRouter } from './auth';
import { userRouter} from './user';
import { serviceRouter } from './service/routes';
export const services = express.Router();

services.use('/auth', authRouter);
services.use('/users', userRouter);
services.use('/services', serviceRouter);