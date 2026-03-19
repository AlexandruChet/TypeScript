"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const node_readline_1 = __importDefault(require("node:readline"));
const admin_commands_1 = require("./admin-commands");
const rl = node_readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
class UserService {
    constructor(userRepository, logger) {
        this.userRepository = userRepository;
        this.logger = logger;
    }
    async checkUserAccess(id) {
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
    async ADMINcommands(id) {
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
        console.log("Hello! You have special commands that regular users do not have. Use them wisely.");
        rl.question("Do you want to use admin commands? (y/n) ", (answer) => {
            this.logger.info("Admin command confirmation", { answer });
            if (answer.toLowerCase() === "y") {
                (0, admin_commands_1.ADMIN_command_manager)();
            }
            else {
                rl.close();
            }
        });
    }
}
exports.UserService = UserService;
