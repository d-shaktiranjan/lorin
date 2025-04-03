export const colorize = (...args: unknown[]) => ({
    red: `\x1b[31m${args.join(" ")}\x1b[0m`, // ERROR (Red Text)
    green: `\x1b[32m${args.join(" ")}\x1b[0m`, // SUCCESS (Green Text)
    cyan: `\x1b[36m${args.join(" ")}\x1b[0m`, // INFO (Cyan Text)
    yellow: `\x1b[33m${args.join(" ")}\x1b[0m`, // WARN (Yellow Text)

    bgCyan: `\x1b[46;30m${args.join(" ")}\x1b[0m`, // INFO Label (Cyan BG, Black Text)
    bgGreen: `\x1b[42;30m${args.join(" ")}\x1b[0m`, // SUCCESS Label (Green BG, Black Text)
    bgYellow: `\x1b[43;30m${args.join(" ")}\x1b[0m`, // WARN Label (Yellow BG, Black Text)
    bgRed: `\x1b[41;37m${args.join(" ")}\x1b[0m`, // ERROR Label (Red BG, White Text)

    default: `\x1b[0m${args.join(" ")}`, // Default Reset
});

export const LOG_DIR = ".logs";
