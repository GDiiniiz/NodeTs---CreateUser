import { User } from "../../../models/users";
import { badResquest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IGetUserIdRepository } from "./protocols";

export class GetUserIdController implements IController {
  constructor(private readonly getUserIdRepository: IGetUserIdRepository) {}
  async handle(
    httpRequest: HttpRequest<IGetUserIdRepository>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest.params.id;

      if (!id) {
        return badResquest("Missing user id");
      }
      const user = await this.getUserIdRepository.getUser(id);
      return ok<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
