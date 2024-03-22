import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { corsOptions } from "./config";
import { logger } from "./middleware/logEvents";
import { credentials } from "./middleware/credentials";

import { SocketConnection } from "./socket/socket";
import { errorHandler } from "./middleware/errorHandler";
import path from "path";

const socketio = require("socket.io");

dotenv.config();

const app: Express = express();
const PORT = 8080;
const server = http.createServer(app);
const io: any = socketio(server);
//scoket connection
SocketConnection(io);

// Database connection

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions as any));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(errorHandler);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
