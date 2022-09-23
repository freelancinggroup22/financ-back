export interface HttpResponse<T = any> {
  statusCode: number;
  body: T;
  error?: Error;
}

export const ok = <T>(data: T): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const created = (): HttpResponse => ({
  statusCode: 201,
  body: null,
});

export const noContent = (): HttpResponse => ({
  statusCode: 200,
  body: null,
});

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  body: error,
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
});

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error,
});

export const conflict = (error: Error): HttpResponse => ({
  statusCode: 409,
  body: error,
});

export const tooMany = (error: Error): HttpResponse => ({
  statusCode: 429,
  body: error,
});

export const fail = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: error,
  error,
});
