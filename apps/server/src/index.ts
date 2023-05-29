import dotenv from "dotenv";
dotenv.config();

import express from "express";
import expressOasGenerator from "express-oas-generator";
import cors from "cors";
import { loginRouter } from "./routes/login";
import { tablesRouter } from "./routes/tables";
import { PrismaClient } from "@prisma/client";
import { verifyToken, getUserByIdAndNext, sendUserInfo } from "./handlers/login";
import { getMenuItemsSortedByCategory } from "./handlers/menu";

const app = express();
expressOasGenerator.init(app, {});
app.use(cors());

export const jwtSecretKey = process.env.JWT_SECRET ?? "";
if (jwtSecretKey === "") {
  throw new Error("No JWT_SECRET defined in .env file");
}

export const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Express + TypeScript Server. This is amayzing 😬😬");
});

app.get("/api/menu", getMenuItemsSortedByCategory);

app.use("/api/login", loginRouter);
app.use("/api/tables", tablesRouter);

// app.use((err, req, res, next) => {
//   console.error(err)
// })

const port = process.env.PORT ?? 4500;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}⚡️`);
});
