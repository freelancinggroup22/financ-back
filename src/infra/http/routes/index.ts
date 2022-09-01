import { Router } from 'express';

import { accountRouter } from './account.routes';

export const router = Router();

router.use('/register', accountRouter);
