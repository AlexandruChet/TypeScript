import { User } from "./user-types";
import { IUserRepository } from "./user-repository-interface";

export const users: User[] = [
  { id: 1, name: "Alex", role: "ADMIN", isBlocked: false, notes: [] },
  { id: 2, name: "Brad", role: "USER", isBlocked: false, notes: [] },
  { id: 3, name: "Felix", role: "USER", isBlocked: true, notes: [] },
];

export class UserRepository implements IUserRepository {
  async getById(id: number): Promise<User | null> {
    return users.find((u) => u.id === id) ?? null;
  }
}
