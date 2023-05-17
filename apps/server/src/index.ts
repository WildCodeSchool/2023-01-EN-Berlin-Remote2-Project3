import dotenv from "dotenv";
dotenv.config();

import express from "express";
import expressOasGenerator from "express-oas-generator";
import cors from "cors";
import { loginRouter } from "./routes/login";
import { PrismaClient } from "@prisma/client";
import { menuItems } from "./mock/menuitems.data";

const app = express();
expressOasGenerator.init(app, {});
app.use(cors());

export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server. This is amayzing 😬😬");
});

// TODO @george.surmava please replace this with actual implementation
app.get("/menuitems", (req, res) => {
  res.json(menuItems);
})

app.use(express.json());

app.use("/api/login", loginRouter);

// app.use((err, req, res, next) => {
//   console.error(err)
// })

const port = process.env.PORT ?? 4500;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}⚡️`);
});
