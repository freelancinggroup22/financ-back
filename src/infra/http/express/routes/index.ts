import { Router } from 'express';

import { accountRouter } from './account.routes';
import { transactionRouter } from './transaction.routes';
import { walletRouter } from './wallet.routes';

export const router = Router();

router.use('/', accountRouter);
router.use('/wallet', walletRouter);
router.use('/transaction', transactionRouter);
