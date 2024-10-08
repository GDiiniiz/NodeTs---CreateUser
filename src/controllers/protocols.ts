export interface HttpResponse<T> {
  statusCode: HttpStatusCode;
  body: T;
}

export interface HttpRequest<B> {
  params?: any;
  header?: any;
  body?: B;
}

export enum HttpStatusCode {
  OK = 200,
  BAD_RESQUEST = 400,
  CREATED = 201,
  SERVER_ERROR = 500,
}

export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
