// Core
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//Routers
import * as routers from './routers';

const app = express();

app.use(bodyParser.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(cors())

// Routers
app.use('/common', routers.health);
app.use('/api', routers.auth);


export { app };
