import express, { Express, Request, Response } from "express";
import expressOasGenerator from "express-oas-generator";
import dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

dotenv.config();

const app: Express = express();
expressOasGenerator.init(app, {});
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server. This is cool 😬");
});

app.get("/users", (req: Request, res: Response) => {
  prisma.users.findMany({}).then((users) => {
    let html = "<ul>";
    for (let i = 0; i < users.length; i++) {
      html += `<li>Username ${users[i].username} has a password of "${users[i].userpassword}".</li>`;
    }
    html += "</ul>";

    res.send(html);
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}⚡️`);
});
