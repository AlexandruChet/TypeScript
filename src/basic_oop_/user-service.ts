import readline from "node:readline";
import { IUserRepository } from "./user-repository-interface";
import { ADMIN_command_manager } from "./admin-commands";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

    return user.role === "ADMIN";
  }

  async ADMINcommands(id: number) {
    const user = await this.userRepository.getById(id);

    if (!user) {
      console.log("User not found");
      return;
    }

    if (user.role === "ADMIN") {
      console.log(
        "Hello! You have special commands that regular users do not have. Use them wisely."
      );
      console.log("If you want to use your commands, type 'y'");

      rl.question(
        "Do you want to use admin commands? (y/n) ",
        (answer: string) => {
          if (answer.toLowerCase() === "y") {
            ADMIN_command_manager();
          } else {
            rl.close();
          }
        }
      );
    } else {
      console.log("You are not an admin. Access denied.");
    }
  }
}
