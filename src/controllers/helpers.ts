import { HttpResponse, HttpStatusCode } from "./protcols";

export const ok = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.OK,
  body: body,
});

export const created = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.CREATED,
  body: body,
});

export const badResquest = (message: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.BAD_RESQUEST,
    body: message,
  };
};

export const serverError = (): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: "Something went wrong",
  };
};
