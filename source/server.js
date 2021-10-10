// Core
import express from 'express';
import bodyParser from 'body-parser';

//Routers
import * as routers from './routers';

const app = express();

app.use(bodyParser.json({ limit: '10kb' }));

// Routers
app.use('/test', routers.test);

export { app };
