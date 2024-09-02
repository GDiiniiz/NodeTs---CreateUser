import { ObjectId } from "mongodb";
import { IDeleteUserRepository } from "../../controllers/delete-user/protcols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/users";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId() });

    if (!user) {
      throw new ErrorEvent("User not found");
    }

   const {deletedCount} = await MongoClient.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

      if (!deletedCount){
        throw new Error("User not deleted")
      }

      const {_id, ...rest} = user

      return id: _id.toHexString(), ...rest}
  }
}
