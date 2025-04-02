import { writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import CONFIG from "./config.js";

export const colorize = (...args: unknown[]) => ({
    red: `\x1b[31m${args.join(" ")}\x1b[0m`,
    green: `\x1b[32m${args.join(" ")}\x1b[0m`,
    cyan: `\x1b[36m${args.join(" ")}\x1b[0ms`,
    bgRed: `\x1b[41m${args.join(" ")}\x1b[0m`,
    yellow: `\x1b[33m${args.join(" ")}\x1b[0m`,
    default: `\x1b[0m${args.join(" ")}\x1b[0m`,
});

const LOG_DIR = CONFIG.logDir;

const LOG_RECORDS: Record<
    string,
    { filePath: string; color: keyof ReturnType<typeof colorize> }
> = {
    INFO: { filePath: `${LOG_DIR}/info.log`, color: "cyan" },
    ERROR: { filePath: `${LOG_DIR}/error.log`, color: "red" },
    WARN: { filePath: `${LOG_DIR}/warn.log`, color: "yellow" },
    SUCCESS: { filePath: `${LOG_DIR}/success.log`, color: "green" },
};

/**
 * Logger interface for logging messages at different levels (info, error, warn, success).
 * Provides methods to log messages to both console and a file.
 */
export const logger = {
    /**
     * Logs an informational message to both console and the 'info.log' file.
     * The message is colorized in cyan.
     *
     * @param message - The message to log.
     */
    info: (message: unknown) => loggerWithType(message, "INFO"),

    /**
     * Logs an error message to both console and the 'error.log' file.
     * The message is colorized in red.
     *
     * @param message - The error message to log.
     */
    error: (message: unknown) => loggerWithType(message, "ERROR"),

    /**
     * Logs a warning message to both console and the 'warn.log' file.
     * The message is colorized in yellow.
     *
     * @param message - The warning message to log.
     */
    warn: (message: unknown) => loggerWithType(message, "WARN"),

    /**
     * Logs a success message to both console and the 'success.log' file.
     * The message is colorized in green.
     *
     * @param message - The success message to log.
     */
    success: (message: unknown) => loggerWithType(message, "SUCCESS"),
};

export function loggerWithType(
    message: unknown,
    logType: "INFO" | "ERROR" | "SUCCESS" | "WARN" = "INFO",
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

    if (CONFIG.isStoreInFile) {
        // create logs dir
        if (!existsSync(LOG_DIR)) mkdirSync(LOG_DIR);

        // store in to file
        writeFile(filePath, logMessage, { flag: "a" }).catch(console.error);
    }
}
