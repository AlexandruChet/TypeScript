"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToJson = saveToJson;
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const user_repository_1 = require("./user-repository");
async function saveToJson(filePath, data, options = { readable: true, createDir: true }) {
    try {
        const absolutePath = (0, node_path_1.resolve)(process.cwd(), filePath);
        if (options.createDir)
            await (0, promises_1.mkdir)((0, node_path_1.dirname)(absolutePath), { recursive: true });
        const jsonString = JSON.stringify(data, null, options.readable ? 2 : 0);
        if (!jsonString)
            throw new Error("Data is not serializable to JSON");
        await (0, promises_1.writeFile)(absolutePath, jsonString, "utf8");
        console.log(`✅ File saved to: ${absolutePath}`);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`❌ [SaveError]: ${message}`);
        throw error;
    }
}
saveToJson("storage/users.json", user_repository_1.users);
