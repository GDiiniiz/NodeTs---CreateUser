import { Item } from "../../../models/items";

export interface CreateItemParams {
  nameItem: string;
  createdAt: Date;
}

export interface ICreateItemRepository { 
  createItem(userId: string, params: CreateItemParams): Promise<Item>
}