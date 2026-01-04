import { UserRepository } from "./user-repository";
import { UserService } from "./user-service";
import { Logger } from "./logger";

const userRepository = new UserRepository();
const logger = new Logger("UserService");

const userService = new UserService(userRepository, logger);

userService.ADMINcommands(1);
