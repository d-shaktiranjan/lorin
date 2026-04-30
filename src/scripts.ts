import { rmSync } from "fs";
export const clearLogs = () => {
    const LOG_DIR = "./logs";
    try {
        rmSync(LOG_DIR, { recursive: true, force: true });
        console.log("Logs cleared successfully.");
    } catch (error) {
        console.log("Error clearing logs:", error);
    }
};
