import express from 'express';
import * as controller from './controller'
export const authRouter = express.Router();



authRouter.route('/').post(controller.register)
authRouter.route('/otp').post(controller.createOtp)
authRouter.route('/otpVerify').post(controller.verifyOtp)
authRouter.route('/login').post(controller.login)
