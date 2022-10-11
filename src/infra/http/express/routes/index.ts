import { Router } from 'express';

import { accountRouter } from './account.routes';
import { walletRouter } from './wallet.routes';

export const router = Router();

router.use('/', accountRouter);
router.use('/wallet', walletRouter);
