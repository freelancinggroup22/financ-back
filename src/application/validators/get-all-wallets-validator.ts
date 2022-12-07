import Joi from 'joi';

import { GetAllWalletsControllerRequest } from '../controllers/get-all-wallets-controller';

export const GetAllWalletsValidator =
  Joi.object<GetAllWalletsControllerRequest>({
    userId: Joi.string().required(),
    limit: Joi.number().optional(),
  });
