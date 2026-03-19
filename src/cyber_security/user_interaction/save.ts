import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { users } from "./user-repository";

interface SaveOptions {
  readable?: boolean;
  createDir?: boolean;
}

export async function saveToJson(
  filePath: string,
  data: unknown,
  options: SaveOptions = { readable: true, createDir: true }
): Promise<void> {
  try {
    const absolutePath = resolve(process.cwd(), filePath);

    if (options.createDir)await mkdir(dirname(absolutePath), { recursive: true });

    const jsonString = JSON.stringify(data, null, options.readable ? 2 : 0);

    if (!jsonString) throw new Error("Data is not serializable to JSON");

    await writeFile(absolutePath, jsonString, "utf8");

    console.log(`✅ File saved to: ${absolutePath}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`❌ [SaveError]: ${message}`);
    throw error;
  }
}

saveToJson("storage/users.json", users);
