import { CreateItemParams, ICreateItemRepository } from "../../../controllers/Item/create-item/protocol";
import { MongoClient } from "../../../database/mongo";
import { Item } from "../../../models/items";
import { MongoItem } from "../../mongo-protocols";

export class MongoCreateItemRepository implements ICreateItemRepository{
 async createItem(userId: string, params: CreateItemParams): Promise<Item> {
   const itemData = {
     ...params,
     userId: userId,
   };

   const { insertedId } = await MongoClient.db.collection("items").insertOne(itemData);

   const item = await MongoClient.db.collection<MongoItem>("items").findOne({_id: insertedId})

   if(!item){
     throw new Error("Item not created");
   }

   const { _id, ...rest } = item;

   return { id: _id.toHexString(), ...rest };

  }
}