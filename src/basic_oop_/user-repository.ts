import { IUserRepository } from "./user-repository-interface";
import { User } from "./user-types";

export class UserRepository implements IUserRepository {
  async getById(id: number): Promise<User | null> {
    const users: User[] = [
      { id: 1, role: "ADMIN", isBlocked: false },
      { id: 2, role: "USER", isBlocked: false },
      { id: 3, role: "USER", isBlocked: true },
    ];

    return users.find((user) => user.id === id) ?? null;
  }
}
