import { ObjectId } from "mongodb";
import { IGetUserIdRepository } from "../../controllers/User/get-user-id/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/users";
import { MongoUser } from "../mongo-protocols";

export class MongoGetUserIdRepository implements IGetUserIdRepository {
  async getUser(id: string): Promise<User> {
    try {
      const mongoUser = await MongoClient.db
        .collection<MongoUser>("users")
        .findOne({ _id: new ObjectId(id) });

      if (!mongoUser) {
        throw new Error("User not found");
      }

      const { _id, ...rest } = mongoUser;
      return { id: _id.toHexString(), ...rest };
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Error fetching user");
    }
  }
}
