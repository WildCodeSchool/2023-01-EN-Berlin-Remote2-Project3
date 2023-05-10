import express, { Express, Request, Response } from "express";
import expressOasGenerator from "express-oas-generator";
import dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

dotenv.config();

const app: Express = express();
expressOasGenerator.init(app, {});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server. This is amayzing 😬😬");
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

const { verifyPassword } = require("./auth");
app.post(
  "/api/login",
  (req, res, next) => {
    const { email } = req.body;
    prisma.users
      .findUniqueOrThrow({ where: { useremail: email } })
      .then(([users]) => {
        if (users[0] != null) {
          req.user = users[0];
          next();
        } else {
          res.sendStatus(401);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from the database");
      });
  },
  verifyPassword
);

const port = process.env.PORT ?? 4500;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}⚡️`);
});
