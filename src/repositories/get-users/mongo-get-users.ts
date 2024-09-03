import { IGetUsersRepository } from "../../controllers/User/get-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/users";
import { MongoUser } from "../mongo-protocols";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    try {
      const users = await MongoClient.db
        .collection<MongoUser>("users")
        .find({})
        .toArray();

      return users.map(({ _id, ...rest }) => ({
        ...rest,
        id: _id.toHexString(),
      }));
    } catch (error) {
      console.error("Error fetching users", error);
      throw error;
    }
  }
}
