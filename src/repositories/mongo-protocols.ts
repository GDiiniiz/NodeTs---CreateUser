import { Item } from "../models/items";
import { User } from "../models/users";

export type MongoUser = Omit<User, "id">;

export type MongoItem = Omit<Item, "id">