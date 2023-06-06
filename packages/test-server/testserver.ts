import * as http from "http";
import { app } from "server";

export const server = http.createServer(app);