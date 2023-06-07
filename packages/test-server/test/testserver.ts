import * as http from "http";
import { app } from "server";
import supertest from "supertest";
import dotenv from "dotenv";

// Load environmental variables
dotenv.config()

// Create a supertest instance with the ExpressJS app object
export const server = supertest(http.createServer(app));
