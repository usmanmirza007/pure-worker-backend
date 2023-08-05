import express from 'express';
import { secret_key } from '../../../secret';
import * as controller from './controller'

export const serviceRouter = express.Router();
const jwt = require('express-jwt')

serviceRouter.route('/').get(jwt(secret_key), controller.getAllProviderProfile)
serviceRouter.route('/potfolio').get(jwt(secret_key), controller.getAllPotfolio)
