import CONFIG, { ConfigType } from "./config.js";
import { logger } from "./logger.js";
import loggerMiddleware from "./logger.middleware.js";

export { logger, loggerMiddleware };

const lorin = (config: Partial<ConfigType>) => {
    CONFIG.logDir = config.logDir || ".logs";
    if (typeof config.isStoreInFile == "boolean")
        CONFIG.isStoreInFile = config.isStoreInFile;
};
export default lorin;

// CommonJS compatibility
// export default { logger, loggerMiddleware };
