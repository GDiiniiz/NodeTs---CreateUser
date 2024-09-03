import { User } from "../../../models/users";

export interface IGetUserIdRepository {
  getUser(id: string): Promise<User>;
}
