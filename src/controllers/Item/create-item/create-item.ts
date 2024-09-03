import moment from "moment-timezone";
import { Item } from "../../../models/items";
import { MongoUserRepository } from "../../../repositories/User/find-by-id/mongo-find-by-id";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { CreateItemParams, ICreateItemRepository } from "./protocol";

export class CreateItemController implements IController {
  private userRepository: MongoUserRepository;

  constructor(
    private readonly createItemRepository: ICreateItemRepository,
    userRepository: MongoUserRepository
  ) {
    this.userRepository = userRepository;
  }

  async handle(httpRequest: HttpRequest<CreateItemParams>): Promise<HttpResponse<Item | string>> {
    try {
      const userId = httpRequest.params.userId;
      const body = httpRequest.body;

      if (!body) {
        return badRequest("Missing field");
      }

      if (!userId) {
        return badRequest("Missing user id");
      }

      // Verifica se o usuário existe
      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        return badRequest("User not found");
      }

      const allowedFieldsToCreateItem: (keyof CreateItemParams)[] = ["nameItem"];
      const someFieldIsNotAllowedCreateItem = Object.keys(body).some(
        (key) => !allowedFieldsToCreateItem.includes(key as keyof CreateItemParams)
      );

      if (someFieldIsNotAllowedCreateItem) {
        return badRequest("Some received field is not allowed");
      }

      const createdAt = moment().tz("America/Sao_Paulo").toDate();

      const newItem: CreateItemParams = {
        ...body,
        createdAt
      };

      const item = await this.createItemRepository.createItem(userId, newItem);

      return ok<Item>(item);
    } catch (error) {
      return serverError();
    }
  }
}
