import { User } from "../../models/users";
import { badResquest, serverError, ok } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protcols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badResquest("Missing field");
      }

      if (!id) {
        return badResquest("Missing user id");
      }

      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];

      const someFiledIsNotAllowedUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams)
      );

      if (someFiledIsNotAllowedUpdate) {
        return badResquest("Some received field is not allowed");
      }

      const user = await this.updateUserRepository.updateUser(id, body);
      return ok<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
