import { Request, Response, NextFunction } from "express";
import { logMessageToConsoleAndFile, colorize } from "./logger.js";

/**
 * Express middleware that logs HTTP request details including method, route, status code, and response time.
 * The log message is colorized based on the HTTP status code:
 * - 5xx: Red background
 * - 4xx: Red text
 * - 3xx: Cyan text
 * - 2xx: Green text
 * - Other: Default color
 *
 * Logs are written to both console and the '.logs/api.log' file with timestamp.
 * The log format is: `[timestamp] protocol: METHOD route statusCode (responseTimeMs)`
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {void}
 *
 * @example
 * // Usage in Express app
 * app.use(loggerMiddleware);
 * // Console output: [2024-03-21 10:30:45] http: GET /api/users 200 (15ms)
 * // File output: [2024-03-21 10:30:45] http: GET /api/users 200 (15ms)
 */
const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();

    res.on("finish", () => {
        const method = req.method;
        const route = req.baseUrl + req.url;
        const statusCode = res.statusCode;

        const endTime = Date.now();
        const logMessage = `${
            req.protocol
        }: ${method} ${route} ${statusCode} (${endTime - startTime}ms)`;

        const color: keyof ReturnType<typeof colorize> =
            statusCode >= 500
                ? "bgRed"
                : statusCode >= 400
                  ? "red"
                  : statusCode >= 300
                    ? "cyan"
                    : statusCode >= 200
                      ? "green"
                      : "default";

        logMessageToConsoleAndFile(logMessage, ".logs/api.log", color);
    });

    next();
};

export default loggerMiddleware;
