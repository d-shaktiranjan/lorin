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

export const LOG_DIR = ".logs";
