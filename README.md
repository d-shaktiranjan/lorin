# Lorin - Express Logger

Lorin is a lightweight and dependency-free logger for Express.js application. It logs API requests to the console and stores logs in a file.

## Installation

```sh
npm install lorin
```

## Usages

### General logger

```js
import { logger } from "lorin";

logger("App started"); // general propose (default type will be "INFO")
logger("App started", "INFO"); // Alternatively you can also pass "INFO"
logger("Successfully connect to DB", "SUCCESS"); // for success logs
logger("Unable to connect to the DB", "ERROR"); // for failure or error logs
```

### API Middleware

```js
import { loggerMiddleware } from "lorin";
import express from "express";

const app = express();

app.use(loggerMiddleware); // use the middleware before using your app routers & endpoints
```

## Log levels & paths

Lorin provides different log levels, each with a specific console color and default file storage location.

| Log level | Description              | Console color         | File path           |
| --------- | ------------------------ | --------------------- | ------------------- |
| `INFO`    | General information logs | Cyan                  | `.logs/info.log`    |
| `ERROR`   | Errors and exceptions    | Red                   | `.logs/error.log`   |
| `SUCCESS` | Success messages         | Green                 | `.logs/success.log` |
| `API`     | API request logs         | Varies by status code | `.logs/api.log`     |
