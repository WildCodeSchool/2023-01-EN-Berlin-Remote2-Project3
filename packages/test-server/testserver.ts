import * as http from "http";
import { app } from "server";
import supertest from "supertest";

export const server = supertest(http.createServer(app));