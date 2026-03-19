"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = require("./user-repository");
const user_service_1 = require("./user-service");
const logger_1 = require("./logger");
const userRepository = new user_repository_1.UserRepository();
const logger = new logger_1.Logger("UserService");
const userService = new user_service_1.UserService(userRepository, logger);
userService.ADMINcommands(1);
