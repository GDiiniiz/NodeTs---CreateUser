import { User } from "../../models/users";

export interface UpdateUserParams {
  firstName?: string;
  lastNams?: string;
  password?: string;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}
