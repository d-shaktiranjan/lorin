import { writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";

export const colorize = (...args: unknown[]) => ({
    red: `\x1b[31m${args.join(" ")}\x1b[0m`,
    green: `\x1b[32m${args.join(" ")}\x1b[0m`,
    cyan: `\x1b[36m${args.join(" ")}\x1b[0m`,
    bgRed: `\x1b[41m${args.join(" ")}\x1b[0m`,
    default: `\x1b[0m${args.join(" ")}\x1b[0m`,
});

const LOG_DIR = ".logs";

const LOG_RECORDS: Record<
    string,
    { filePath: string; color: keyof ReturnType<typeof colorize> }
> = {
    INFO: { filePath: `${LOG_DIR}/info.log`, color: "cyan" },
    ERROR: { filePath: `${LOG_DIR}/error.log`, color: "red" },
    SUCCESS: { filePath: `${LOG_DIR}/success.log`, color: "green" },
};

export const logger = {
    info: (message: unknown) => loggerWithType(message, "INFO"),
    error: (message: unknown) => loggerWithType(message, "ERROR"),
    success: (message: unknown) => loggerWithType(message, "SUCCESS"),
};

export function loggerWithType(
    message: unknown,
    logType: "INFO" | "ERROR" | "SUCCESS" = "INFO",
) {
    const { filePath, color } = LOG_RECORDS[logType];
    logMessageToConsoleAndFile(message, filePath, color);
}

export function logMessageToConsoleAndFile(
    message: unknown,
    filePath: string,
    color: keyof ReturnType<typeof colorize> = "cyan",
) {
    const timeStamp = new Date().toLocaleString("sv-SE");
    const logMessage = `[${timeStamp}] ${message}\n`;

    console.log(`[${timeStamp}]`, colorize(message)[color]);

    // create logs dir
    if (!existsSync(LOG_DIR)) mkdirSync(LOG_DIR);

    // store in to file
    writeFile(filePath, logMessage, { flag: "a" }).catch(console.error);
}
