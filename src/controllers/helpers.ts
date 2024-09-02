import { HttpResponse } from "./protcols";

export const ok = <T>(body: any): HttpResponse<T> => ({
  statusCode: 200,
  body: body,
});

export const created = <T>(body: any): HttpResponse<T> => ({
  statusCode: 201,
  body: body,
});

export const badResquest = (message: string): HttpResponse<string> => {
  return {
    statusCode: 400,
    body: message,
  };
};

export const serverError = (): HttpResponse<string> => {
  return {
    statusCode: 500,
    body: "Something went wrong",
  };
};
