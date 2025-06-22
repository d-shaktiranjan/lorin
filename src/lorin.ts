#!/usr/bin/env node

import { clearLogs } from "./scripts.js";

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case "clean":
        clearLogs();
        break;
    default:
        console.log(`Unknown command: ${command}`);
        console.log(`Usage: lorin <command>\nAvailable commands: clean`);
        break;
}
