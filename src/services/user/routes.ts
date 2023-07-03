import express from 'express';
import { secret_key } from '../../../secret';
import * as controller from './controller'
import storage from './../../../provider/multerconfig'

export const userRouter = express.Router();
const jwt = require('express-jwt')

userRouter.route('/').get(jwt(secret_key), controller.userDetail)
userRouter.route('/category').get(controller.getCategory)
userRouter.route('/category/:categoryId').get(controller.getSubcategoryFromCategory)
userRouter.route("/service").post(jwt(secret_key), storage.fields([
  {
    name: 'profilePicture',
    maxCount: 1
  },
  {
    name: 'serviceImageFirst',
    maxCount: 1
  },
  {
    name: 'serviceImageSecond',
    maxCount: 1
  },
  {
    name: 'serviceImageThird',
    maxCount: 1
  }
]), controller.createService)
