import { User } from "../../models/users";
import { HttpResponse } from "../protcols";

export interface IGetUsersController {
  handle(): Promise<HttpResponse<User[]>>;
}

export interface IGetUsersRepository {
  getUsers(): Promise<User[]>;
}
