# Lorin - Express Logger

Lorin is a lightweight, dependency-free Express.js middleware for colorful, categorized logging of API requests, with both console output and file storage.

## Installation

```sh
npm install lorin
```

## Usages

### API Middleware

Logs every incoming request, including the time, protocol, method, endpoint, status code, and the time taken by your server (in ms). It also stores the log in the `.logs/api.log` file.

```js
import { loggerMiddleware } from "lorin";
import express from "express";

const app = express();

app.use(loggerMiddleware); // use the middleware before using your app routers & endpoints
```

Sample console output:
![Screenshot 2025-03-20 at 12 13 36 AM](https://github.com/user-attachments/assets/88463324-d888-4c6f-b752-37f62350266b)

### General logger

This can be used to highlight specific events, such as server restarts, database connections, and more. The logs are stored in the corresponding files mentioned below.

```js
import { logger } from "lorin";

logger.info("App started"); // informational or general logs
logger.success("Successfully connect to DB"); // success logs
logger.warn("This will be deprecated soon"); // warn logs
logger.error("Unable to connect to the DB"); // failure or error logs
```

Sample console output:
![Screenshot 2025-03-20 at 12 03 48 AM](https://github.com/user-attachments/assets/c8da1919-e8c9-41d8-9567-4b69b0d91300)

## Log levels & paths

Lorin offers different log levels, each with a specific console color and default file storage location.

### API middleware

For API middleware logs, all logs are stored in `.logs/api.log`.

| Status Code | Description            | Console Color |
| ----------- | ---------------------- | ------------- |
| `200-299`   | Successful responses   | Green         |
| `300-399`   | Redirection messages   | Cyan          |
| `400-499`   | Client error responses | Red           |
| `500-599`   | Server error responses | BG-Red        |

### General logger

| Log method | Description                        | Console color | File path           |
| ---------- | ---------------------------------- | ------------- | ------------------- |
| `info`     | General information logs           | Cyan          | `.logs/info.log`    |
| `success`  | Successful operations logs         | Green         | `.logs/success.log` |
| `warn`     | Warnings, potential issues logs    | Yellow        | `.logs/warn.log`    |
| `error`    | Errors, failures, or critical logs | Red           | `.logs/error.log`   |
