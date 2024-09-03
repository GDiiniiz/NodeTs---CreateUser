import { User } from "../../../models/users";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IDeleteUserRepository } from "./protcols";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepositor: IDeleteUserRepository) {}
  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing user id");
      }

      const user = await this.deleteUserRepositor.deleteUser(id);

      return ok<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
