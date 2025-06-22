import { rmSync } from "fs";
import { logger } from "./logger.js";

export const clearLogs = () => {
    const LOG_DIR = "./logs";
    try {
        rmSync(LOG_DIR, { recursive: true, force: true });
        logger.success("Logs cleared successfully.");
    } catch (error) {
        logger.error(`Error clearing logs:, ${error}`);
    }
};
