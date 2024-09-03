import { Item } from "../../../models/items";

export interface IGetItemUserRepository {
  getItems(userId: string): Promise<Item[]>
}