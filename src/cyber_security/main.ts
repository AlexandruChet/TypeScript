import { runVirus } from "./virus"
import { databaseEN } from "./bank"

runVirus()

console.log(databaseEN[0].accounts[0].balance)
console.log(databaseEN[0].accounts[0].status)
