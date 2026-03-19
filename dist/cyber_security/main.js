"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virus_1 = require("./virus");
const bank_1 = require("./bank");
(0, virus_1.runVirus)();
console.log(bank_1.databaseEN[0].accounts[0].balance);
console.log(bank_1.databaseEN[0].accounts[0].status);
