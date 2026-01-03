import { IUserRepository } from "./user-repository-interface";

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async checkUserAccess(id: number): Promise<boolean> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.isBlocked) {
      return false;
    }

    if (user.role === "ADMIN") {
      console.log(
        "Hello, we would like to remind you that you have commands that users do not have, please use them wisely."
      );

      console.log("If you want to use your commands, write ADMIN-command");
    }

    return user.role === "ADMIN";
  }
}
