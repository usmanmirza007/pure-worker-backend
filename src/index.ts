import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { services } from './services';


const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use('/api', services);

const port = 8000;

app.listen(port, () =>
    console.log(`Express app listening on localhost:${port}`)
);