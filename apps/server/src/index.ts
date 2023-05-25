import dotenv from "dotenv";
dotenv.config();

import express from "express";
import expressOasGenerator from "express-oas-generator";
import cors from "cors";
import { loginRouter } from "./routes/login";
import { tablesRouter } from "./routes/tables";
import { PrismaClient } from "@prisma/client";
import { verifyToken, getUserByIdAndNext, sendUserInfo } from "./authHandlers";
import { getMenuItemsSortedByCategory } from "./menuHandlers";

const app = express();
expressOasGenerator.init(app, {});
app.use(cors());

export const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Express + TypeScript Server. This is amayzing 😬😬");
});

app.get("/api/menu", getMenuItemsSortedByCategory);

app.use("/api/login", loginRouter);
app.get("/api/verification", verifyToken, getUserByIdAndNext, sendUserInfo);
app.use("/api/tables", tablesRouter);

// app.use((err, req, res, next) => {
//   console.error(err)
// })

const port = process.env.PORT ?? 4500;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}⚡️`);
});
