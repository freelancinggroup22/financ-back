import { HttpResponse } from './http';

export interface Middleware<T = any, U = any> {
  handle: (request: T, body?: U) => Promise<HttpResponse>;
}
