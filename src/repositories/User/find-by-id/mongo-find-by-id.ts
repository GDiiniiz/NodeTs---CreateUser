import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/users";
export class MongoUserRepository {
  async findUserById(userId: string): Promise<User | null> {
    const user = await MongoClient.db.collection("users").findOne({ _id: new ObjectId(userId) });

    if (!user) return null;

    const { _id, ...rest } = user;
    return { id: _id.toHexString(), ...rest } as User;
  }
}
