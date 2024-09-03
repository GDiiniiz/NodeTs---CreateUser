import { IGetItemUserRepository } from "../../../controllers/Item/get-item-user/protocols";
import { MongoClient } from "../../../database/mongo";
import { Item } from "../../../models/items";
import { MongoItem } from "../../mongo-protocols";

export class MongoGetItemUser implements IGetItemUserRepository{
  async getItems(userId: string): Promise<Item[]> {
    try {
      const itemsUser = await MongoClient.db
        .collection<MongoItem>("items")
        .find({userId})
        .toArray()

      return itemsUser.map(({ _id, ...rest }) => ({
        id: _id.toHexString(), 
        ...rest
      }));

      } catch (error) {
      console.error("Error fetching items user:", error);
      throw new Error("Error fetching items user");
    }
  }
}