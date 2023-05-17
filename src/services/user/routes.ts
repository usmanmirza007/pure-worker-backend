import express from 'express';
import { secret_key } from '../../../secret';
import * as controller from './controller'
export const userRouter = express.Router();
const jwt= require('express-jwt')

userRouter.route('/').get(jwt(secret_key), controller.userDetail)