import { writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import CONFIG from "./config.js";

export const colorize = (...args: unknown[]) => ({
    red: `\x1b[31m${args.join(" ")}\x1b[0m`,
    green: `\x1b[32m${args.join(" ")}\x1b[0m`,
    cyan: `\x1b[36m${args.join(" ")}\x1b[0ms`,
    bgRed: `\x1b[41m${args.join(" ")}\x1b[0m`,
    default: `\x1b[0m${args.join(" ")}\x1b[0m`,
});

const LOG_DIR = CONFIG.logDir;

const LOG_RECORDS: Record<
    string,
    { filePath: string; color: keyof ReturnType<typeof colorize> }
> = {
    INFO: { filePath: `${LOG_DIR}/info.log`, color: "cyan" },
    ERROR: { filePath: `${LOG_DIR}/error.log`, color: "red" },
    SUCCESS: { filePath: `${LOG_DIR}/success.log`, color: "green" },
};

export const logger = (
    message: unknown,
    logType: "INFO" | "ERROR" | "SUCCESS" = "INFO",
) => {
    logMessageToConsoleAndFile(
        message,
        LOG_RECORDS[logType].filePath,
        LOG_RECORDS[logType].color,
    );
};

export function logMessageToConsoleAndFile(
    message: unknown,
    filePath: string,
    color: keyof ReturnType<typeof colorize> = "cyan",
) {
    const timeStamp = new Date().toLocaleString("sv-SE");
    const logMessage = `[${timeStamp}] ${message}\n`;

    console.log(`[${timeStamp}]`, colorize(message)[color]);

    if (CONFIG.isStoreInFile) {
        // create logs dir
        if (!existsSync(LOG_DIR)) mkdirSync(LOG_DIR);

        // store in to file
        writeFile(filePath, logMessage, { flag: "a" }).catch(console.error);
    }
}
