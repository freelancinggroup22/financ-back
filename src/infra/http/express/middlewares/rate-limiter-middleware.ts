// import { RateLimiterMemory, RateLimiterAbstract } from 'rate-limiter-flexible';

// import { HttpResponse, ok, tooMany } from '@/core/infra/http';
// import { Middleware } from '@/core/infra/middleware';

// const maxWrongAttemptsByIPperDay = 100;

// const rateLimiterMemory: RateLimiterAbstract = new RateLimiterMemory({
//   points: maxWrongAttemptsByIPperDay,
//   duration: 60,
//   blockDuration: 60,
// });

// export class RateLimiter implements Middleware {
//   async handle(request: any, body?: any): Promise<HttpResponse> {
//     try {
//       const response = await rateLimiterMemory.consume(request.ipAddr);

//       // if (response.consumedPoints > maxWrongAttemptsByIPperDay) {
//       //   return tooMany();
//       // }

//       return ok(response);
//     } catch (error) {
//       return fail(error as Error);
//     }
//   }
// }
