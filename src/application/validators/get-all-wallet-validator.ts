import Joi from 'joi';

import { GetAllWalletsControllerRequest } from '../controllers/get-all-wallet-controller';

export const GetAllWalletsValidator =
  Joi.object<GetAllWalletsControllerRequest>({
    userId: Joi.string().required(),
    limit: Joi.number().optional(),
  });
