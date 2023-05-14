import dotenv from "dotenv";
dotenv.config();

import express from "express";
import expressOasGenerator from "express-oas-generator";
import cors from "cors";
import { validateRequestEmailPassword, getUserByEmailPassword, verifyPassword } from "./auth";

const app = express();
expressOasGenerator.init(app, {});
app.use(cors());

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server. This is amayzing 😬😬");
});

app.use(express.json());

app.post(
  "/api/login",
  validateRequestEmailPassword,
  getUserByEmailPassword,
  verifyPassword
);

// app.use((err, req, res, next) => {
//   console.error(err)
// })

const port = process.env.PORT ?? 4500;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}⚡️`);
});
