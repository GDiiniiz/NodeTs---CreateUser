import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/users";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firtsName: "Guilherme",
        lastName: "Diniz",
        email: "guilherme@gmail.com",
        password: "123",
      },
    ];
  }
}
