// Core
import express from 'express';

// Instruments
import { test } from './route';
import { limiter } from '../../utils';

export const router = express.Router();

router.get('/test', [ limiter(5, 60 * 1000) ], test);

export { router as test };
