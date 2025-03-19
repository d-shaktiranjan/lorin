import { Request, Response, NextFunction } from "express";
import { logMessageToConsoleAndFile, colorize } from "./logger.js";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    const originalSend = res.send.bind(res);

    let responseBody: string | Buffer = "";

    res.send = (body) => {
        responseBody = body;
        return originalSend(body);
    };

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
