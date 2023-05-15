import dotenv from "dotenv";
dotenv.config();

import express from "express";
import expressOasGenerator from "express-oas-generator";
import cors from "cors";
import { loginRouter } from "./routes/login";
import { PrismaClient } from "@prisma/client";

const app = express();
expressOasGenerator.init(app, {});
app.use(cors());

export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server. This is amayzing 😬😬");
});

app.use(express.json());

app.use("/api/login", loginRouter);

// app.use((err, req, res, next) => {
//   console.error(err)
// })

const port = process.env.PORT ?? 4500;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}⚡️`);
});
