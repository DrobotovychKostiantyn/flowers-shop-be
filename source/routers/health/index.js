// Core
import express from 'express';

// Instruments
import { health } from './route';
import { limiter } from '../../utils';

export const router = express.Router();

router.get('/health', [ limiter(5, 60 * 1000) ], health);

export { router as health };
