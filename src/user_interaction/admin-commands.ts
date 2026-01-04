import readline from "node:readline";
import { User } from "./user-types";
import { users } from "./user-repository";
import { saveToJson } from "./save";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "admin> ",
});

export function ADMIN_command_manager(): void {
  rl.prompt();

  rl.on("line", handleInput).on("close", () => {
    console.log("Program is closing");
    process.exit(0);
  });
}

function handleInput(line: string): void {
  const [command, ...args] = line.trim().split(" ");
  const handler = commands[command];
  if (!handler) console.log("Unknown command. Type 'help' to see available commands.");
  else handler(args);
  rl.prompt();
}

type CommandHandler = (args: string[]) => void;

const commands: Record<string, CommandHandler> = {
  block: ([id]) => handleBlock(Number(id)),
  unblock: ([id]) => handleUnblock(Number(id)),
  note: ([id, ...text]) => handleNote(Number(id), text.join(" ")),
  list: handleList,
  stats: handleStats,
  help: handleHelp,
  save: persist,
  delete: ([id]) => handleDelete(Number(id)),
  undo: () => undo(),
  exit: () => rl.close(),
};

function getUserById(id: number): User | null {
  if (Number.isNaN(id)) {
    console.log("Invalid user ID");
    return null;
  }

  const user = users.find((e) => e.id === id);
  if (!user) {
    console.log(`User with ID ${id} not found`);
    return null;
  }

  return user;
}

function handleBlock(id: number): void {
  const user = getUserById(id);
  if (!user) return;
  if (user.role !== "ADMIN") return console.log("Only admins can use this command");
  if (user.isBlocked) return console.log("This user is already blocked");
  snapshot();
  user.isBlocked = true;
  persist();
  console.log(`User ${user.name} (ID: ${user.id}) is now blocked`);
}

function handleUnblock(id: number): void {
  const user = getUserById(id);
  if (!user) return;
  if (!user.isBlocked) return console.log("User is not blocked");
  user.isBlocked = false;
  persist();
  console.log(`User ${user.name} (ID: ${user.id}) is now unblocked`);
}

function handleNote(id: number, note: string): void {
  const user = getUserById(id);
  if (!user) return;
  if (!note.trim()) return console.log("Please provide a note text");
  user.notes.push(note);
  persist();
  console.log(`Note added for ${user.name} (ID: ${user.id})`);
}

function handleList([filter]: string[] = []): void {
  let result = users;
  if (filter === "blocked") result = users.filter((e) => e.isBlocked);
  if (filter === "active") result = users.filter((e) => !e.isBlocked);
  if (result.length === 0) return console.log("No users found");

  result.forEach((e) => {
    console.log(
      `${e.id} | ${e.name} | ${e.isBlocked ? "Blocked" : "Active"} | Notes: ${
        e.notes.join(", ") || "—"
      }`
    );
  });
}

function handleStats(): void {
  const total = users.length;
  const blocked = users.filter((e) => e.isBlocked).length;
  console.log(`Total users: ${total}`);
  console.log(`Blocked users: ${blocked}`);
  console.log(`Active users: ${total - blocked}`);
}

function persist() {
  saveToJson("storage/users.json", users);
}

function handleDelete(id: number): void {
  const index = users.findIndex((e) => e.id === id);
  if (index === -1) return console.log(`User with ID ${id} not found`);
  snapshot();
  const [removed] = users.splice(index, 1);
  persist();
  console.log(`User ${removed.name} (ID: ${id}) deleted`);
}

const history: User[][] = [];

function snapshot() {
  history.push(structuredClone(users));
}

function undo() {
  const prev = history.pop();
  if (!prev) return console.log("Nothing to undo");
  users.length = 0;
  users.push(...prev);
  saveToJson("storage/users.json", users);
  console.log("Last action reserved");
}

function handleHelp(): void {
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
