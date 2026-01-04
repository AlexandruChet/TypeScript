import { User } from "./user-types";

export interface IUserRepository {
  getById(id: number): Promise<User | null>;
}
