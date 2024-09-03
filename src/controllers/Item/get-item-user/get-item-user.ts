import { Item } from "../../../models/items";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IGetItemUserRepository } from "./protocols";

export class GetItemUserController implements IController{
  constructor(private readonly getItemUserRepository: IGetItemUserRepository){}
  async handle(httpRequest: HttpRequest<IGetItemUserRepository>): Promise<HttpResponse<Item | string>> {
    try {
      const userId = httpRequest.params.userId

      if (!userId) {
        return badRequest("Missing user id");
      }
      const itemUser = await this.getItemUserRepository.getItems(userId);
      return ok<Item>(itemUser);
    } catch (error) {
      return serverError();

    }
  }
}