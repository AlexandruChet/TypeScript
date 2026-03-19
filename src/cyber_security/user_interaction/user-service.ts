import readline from "node:readline";
import { IUserRepository } from "./user-repository-interface";
import { ADMIN_command_manager } from "./admin-commands";
import { ILogger } from "./logger";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export class UserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly logger: ILogger
  ) {}

  async checkUserAccess(id: number): Promise<boolean> {
    this.logger.info("Checking user access", { id });

    const user = await this.userRepository.getById(id);

    if (!user) {
      this.logger.error("User not found", { id });
      throw new Error("User not found");
    }

    if (user.isBlocked) {
      this.logger.info("Access denied: user is blocked", { id });
      return false;
    }

    const isAdmin = user.role === "ADMIN";
    this.logger.info("Access check result", { id, isAdmin });

    return isAdmin;
  }

  async ADMINcommands(id: number): Promise<void> {
    this.logger.info("Admin command request", { id });

    const user = await this.userRepository.getById(id);

    if (!user) {
      this.logger.error("User not found", { id });
      return;
    }

    if (user.role !== "ADMIN") {
      this.logger.warn?.("Access denied: not admin", { id });
      console.log("You are not an admin. Access denied.");
      return;
    }

    console.log(
      "Hello! You have special commands that regular users do not have. Use them wisely."
    );

    rl.question("Do you want to use admin commands? (y/n) ", (answer) => {
      this.logger.info("Admin command confirmation", { answer });

      if (answer.toLowerCase() === "y") {
        ADMIN_command_manager();
      } else {
        rl.close();
      }
    });
  }
}
