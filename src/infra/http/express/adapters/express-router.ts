import { Request, Response } from 'express';

import { Controller } from '@/core/infra/controller';

export const routerAdapter = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest = {
      ...request.body,
      ...request.params,
      ...request.query,
      userId: request.userId,
    };

    const httpResponse = await controller.handle(httpRequest);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return response.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.body,
      });
    }
  };
};
