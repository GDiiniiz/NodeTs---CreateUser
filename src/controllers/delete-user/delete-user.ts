import { User } from "../../models/users";
import { HttpRequest, HttpResponse } from "../protcols";
import { IDeleteUserController, IDeleteUserRepository } from "./protcols";

export class DeleteUserController implements IDeleteUserController {
  constructor(private readonly deleteUserRepositor: IDeleteUserRepository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
      }

      const user = await this.deleteUserRepositor.deleteUser(id);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
