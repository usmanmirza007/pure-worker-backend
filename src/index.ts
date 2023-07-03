import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';


import { services } from './services';
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev', {
    skip: function (req: any, res: any) { return res.statusCode < 400 }
  }))
  app.use(morgan('dev', {
    skip: function (req: any, res: any) { return res.statusCode >= 400 }
  }))

app.use('/api', services);

const port = 8000;

app.listen(port, () =>
    console.log(`Express app listening on localhost:${port}`)
);