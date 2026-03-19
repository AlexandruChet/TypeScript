"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_command_manager = ADMIN_command_manager;
const node_readline_1 = __importDefault(require("node:readline"));
const user_repository_1 = require("./user-repository");
const save_1 = require("./save");
const rl = node_readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "admin> ",
});
const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));
async function ADMIN_command_manager() {
    const name = await askQuestion("Enter admin name: ");
    const password = await askQuestion("Enter password: ");
    const admin = user_repository_1.users.find((u) => u.role === "ADMIN" && u.name === name && u.adminPassword === password);
    if (!admin) {
        console.error("Error: Invalid username or password. Access denied");
        rl.close();
        return;
    }
    rl.prompt();
    rl.on("line", handleInput).on("close", () => {
        console.log("Program is closing");
        process.exit(0);
    });
}
function isAdminHelper(user) {
    return user.role === "ADMIN";
}
function handleInput(line) {
    const [command, ...args] = line.trim().split(" ");
    const handler = commands[command];
    if (!handler)
        console.log("Unknown command. Type 'help' to see available commands.");
    else
        handler(args);
    rl.prompt();
}
const commands = {
    block: ([id]) => handleBlock(Number(id)),
    unblock: ([id]) => handleUnblock(Number(id)),
    note: ([id, ...text]) => handleNote(Number(id), text.join(" ")),
    list: (args) => handleList(args),
    stats: () => handleStats(),
    help: () => handleHelp(),
    save: () => persist(),
    delete: ([id]) => handleDelete(Number(id)),
    undo: () => undo(),
    exit: () => rl.close(),
};
function getUserById(id) {
    const parseId = Number(id);
    if (!Number.isInteger(parseId)) {
        console.log("Invalid user ID");
        return null;
    }
    if (isNaN(id)) {
        console.log("Error: Please provide a valid numeric ID.");
        return null;
    }
    const user = user_repository_1.users.find((e) => e.id === parseId);
    if (!user) {
        console.log(`User with ID ${id} not found`);
        return null;
    }
    return user;
}
function handleBlock(id) {
    const user = getUserById(id);
    if (!user)
        return;
    if (isAdminHelper(user))
        return console.log("Error: Administrators cannot be blocked.");
    if (user.isBlocked)
        return console.log("This user is already blocked");
    snapshot();
    user.isBlocked = true;
    persist();
    console.log(`User ${user.name} (ID: ${user.id}) is now blocked`);
}
function handleUnblock(id) {
    const user = getUserById(id);
    if (!user)
        return;
    if (!user.isBlocked)
        return console.log("User is not blocked");
    user.isBlocked = false;
    persist();
    console.log(`User ${user.name} (ID: ${user.id}) is now unblocked`);
}
function handleNote(id, note) {
    const user = getUserById(id);
    if (!user)
        return;
    if (!note.trim())
        return console.log("Please provide a note text");
    user.notes.push(note);
    persist();
    console.log(`Note added for ${user.name} (ID: ${user.id})`);
}
function handleList([filter] = []) {
    let result = user_repository_1.users;
    if (filter === "blocked")
        result = user_repository_1.users.filter((e) => e.isBlocked);
    if (filter === "active")
        result = user_repository_1.users.filter((e) => !e.isBlocked);
    if (result.length === 0)
        return console.log("No users found");
    result.forEach((e) => {
        console.log(`${e.id} | ${e.name} | ${e.isBlocked ? "Blocked" : "Active"} | Notes: ${e.notes.join(", ") || "—"}`);
    });
}
function handleStats() {
    const total = user_repository_1.users.length;
    const blocked = user_repository_1.users.filter((e) => e.isBlocked).length;
    console.log(`Total users: ${total}`);
    console.log(`Blocked users: ${blocked}`);
    console.log(`Active users: ${total - blocked}`);
}
function persist() {
    (0, save_1.saveToJson)("storage/users.json", user_repository_1.users);
}
function handleDelete(id) {
    const index = user_repository_1.users.findIndex((e) => e.id === id);
    if (index === -1)
        return console.log(`User with ID ${id} not found`);
    snapshot();
    const [removed] = user_repository_1.users.splice(index, 1);
    persist();
    console.log(`User ${removed.name} (ID: ${id}) deleted`);
}
const history = [];
function snapshot() {
    history.push(structuredClone(user_repository_1.users));
}
function undo() {
    const prev = history.pop();
    if (!prev)
        return console.log("Nothing to undo");
    user_repository_1.users.length = 0;
    user_repository_1.users.push(...prev);
    (0, save_1.saveToJson)("storage/users.json", user_repository_1.users);
    console.log("reserved");
}
function handleHelp() {
    console.log(`
Available commands:

 User management:
  block <id>              Block user
  unblock <id>            Unblock user
  delete <id>             Delete user
  note <id> <text>        Add note to user

 Viewing:
  list                    Show all users
  list blocked            Show only blocked users
  list active             Show only active users
  stats                   Show statistics

 Persistence:
  save                    Save users to JSON
  undo                    Undo last action

 System:
  help                    Show this help
  exit                    Exit program
`);
}
