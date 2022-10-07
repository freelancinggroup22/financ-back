import { Request, Response, NextFunction } from 'express';

import { Middleware } from '@/core/infra/middleware';

export const middlewareAdapter = (middlewares: Middleware[]) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    for (const middleware of middlewares) {
      const httpRequest = {
        accessToken: request.headers?.authorization?.split(' ')[1],
        ipAddr: request.ip,
      };

      const httpResponse = await middleware.handle(httpRequest);

      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        Object.assign(request, httpResponse.body);
        next();
      } else {
        return response.status(httpResponse.statusCode).json({
          error: httpResponse.body,
        });
      }
    }
  };
};
