import readline from "node:readline";
import { User } from "./user-types";
import { users } from "./user-repository";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "admin> ",
});

export function ADMIN_command_manager() {
  rl.prompt();

  rl.on("line", (line: string) => {
    const [command, ...args] = line.trim().split(" ");

    switch (command) {
      case "block":
        handleBlock(Number(args[0]));
        break;

      case "unblock":
        handleUnblock(Number(args[0]));
        break;

      case "note":
        handleNote(Number(args[0]), args.slice(1).join(" "));
        break;

      case "list":
        handleList();
        break;

      case "stats":
        handleStats();
        break;

      case "exit":
        rl.close();
        break;

      default:
        console.log("Unknown command");
        break;
    }

    rl.prompt();
  }).on("close", () => {
    console.log("Program is closing");
    process.exit(0);
  });
}

function handleBlock(id: number) {
  const user = users.find((e) => e.id === id);
  if (!user) return console.log(`User with ID ${id} not found`);
  if (user.isBlocked) return console.log("This user is already blocked");
  user.isBlocked = true;
  console.log(`User ${user.name} (ID: ${user.id}) is now blocked`);
}

function handleUnblock(id: number) {
  const user = users.find((e) => e.id === id);
  if (!user) return console.log(`User with ID ${id} not found`);
  if (!user.isBlocked) return console.log("User is not blocked");
  user.isBlocked = false;
  console.log(`User ${user.name} (ID: ${user.id}) is now unblocked`);
}

function handleList() {
  users.forEach((u) => {
    console.log(
      `${u.id} ${u.name} ${
        u.isBlocked ? "Blocked" : "Active"
      } Notes: ${u.notes.join(", ")}`
    );
  });
}

function handleNote(id: number, note: string) {
  const user = users.find((e) => e.id === id);
  if (!user) return console.log(`User with ID ${id} not found`);
  if (!note) return console.log("Please provide a note text");
  user.notes.push(note);
  console.log(`Note added for ${user.name} (ID: ${user.id})`);
}

function handleStats() {
  const total = users.length;
  const blocked = users.filter((u) => u.isBlocked).length;
  console.log(`Total users: ${total}`);
  console.log(`Blocked users: ${blocked}`);
  console.log(`Active users: ${total - blocked}`);
}
