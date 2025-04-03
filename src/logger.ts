import { writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";

export const colorize = (...args: unknown[]) => ({
    red: `\x1b[31m${args.join(" ")}\x1b[0m`,
    green: `\x1b[32m${args.join(" ")}\x1b[0m`,
    cyan: `\x1b[36m${args.join(" ")}\x1b[0m`,
    yellow: `\x1b[33m${args.join(" ")}\x1b[0m`,
    bgRed: `\x1b[41m${args.join(" ")}\x1b[0m`,
    bgGreen: `\x1b[42m${args.join(" ")}\x1b[0m`,
    bgCyan: `\x1b[46m${args.join(" ")}\x1b[0m`,
    bgYellow: `\x1b[43m${args.join(" ")}\x1b[0m`,
    default: `\x1b[0m${args.join(" ")}\x1b[0m`,
});

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

const LOG_DIR = ".logs";

const LOG_RECORDS: Record<
    string,
    { filePath: string; color: keyof ReturnType<typeof colorize> }
> = {
    INFO: { filePath: `${LOG_DIR}/info.log`, color: "cyan" },
    ERROR: { filePath: `${LOG_DIR}/error.log`, color: "red" },
    WARN: { filePath: `${LOG_DIR}/warn.log`, color: "yellow" },
    SUCCESS: { filePath: `${LOG_DIR}/success.log`, color: "green" },
};

export function loggerWithType(
    message: unknown,
    logType: "INFO" | "ERROR" | "SUCCESS" | "WARN" = "INFO",
) {
    const { filePath, color } = LOG_RECORDS[logType];
    logMessageToConsoleAndFile(message, filePath, color, {
        label: logType,
    });
}

export function logMessageToConsoleAndFile(
    message: unknown,
    filePath: string,
    color: keyof ReturnType<typeof colorize> = "cyan",
    options: {
        label: string;
    } | null = null,
) {
    const timeStamp = new Date().toLocaleString("sv-SE");
    const logMessage = `[${timeStamp}] ${message}\n`;

    // color log with label
    if (options?.label) {
        const bgColor = color.replace(
            /^[a-z]/,
            (match) => `bg${match.toUpperCase()}`,
        ) as keyof ReturnType<typeof colorize>;
        console.log(
            `[${timeStamp}]`,
            colorize(options.label + ":")[bgColor],
            colorize(message)[color],
        );
    } else console.log(`[${timeStamp}]`, colorize(message)[color]); // log without label

    // create logs dir
    if (!existsSync(LOG_DIR)) mkdirSync(LOG_DIR);

    // store in to file
    writeFile(filePath, logMessage, { flag: "a" }).catch(console.error);
}
