import readline from "node:readline";
import { User } from "./user-types";
import { users } from "./user-repository";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "admin> "
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
  if (user.isBlocked) return console.log("This user is already blocked");
  user.isBlocked = true;
  console.log(`User ${user.name} (ID: ${user.id}) is now blocked`);
}

function handleUnblock(id: number): void {
  const user = getUserById(id);
  if (!user) return;
  if (!user.isBlocked) return console.log("User is not blocked");
  user.isBlocked = false;
  console.log(`User ${user.name} (ID: ${user.id}) is now unblocked`);
}

function handleNote(id: number, note: string): void {
  const user = getUserById(id);
  if (!user) return;
  if (!note.trim()) return console.log("Please provide a note text");
  user.notes.push(note);
  console.log(`Note added for ${user.name} (ID: ${user.id})`);
}

function handleList(): void {
  if (users.length === 0) return console.log("No users found");
  users.forEach((e) => {
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

function handleHelp(): void {
  console.log(`
Available commands:
 block <id>              Block user
 unblock <id>            Unblock user
 note <id> <text>        Add note to user
 list                    Show all users
 stats                   Show statistics
 help                    Show this help
 exit                    Exit program
`);
}
