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

app.use(express.json());
const { verifyPassword } = require("./auth");
app.post(
  "/api/login",
  async (req, res, next) => {
    //Validating the request body
    if (req.body?.email === undefined || req.body?.password === undefined) {
      res.status(400).send("Invalid request: no email or password provided");
    } else {
      next();
    }
  },
  async (req, res, next) => {
    //Quering the database. Checking if the email exists
    prisma.users
      .findUnique({
        select: { useremail: true },
        where: { useremail: req.body.email },
      })
      .then((found) => {
        console.log(found)
        if (found == null) {
          res.status(404).send('No user is registered with the provided email');
        } else {
          // now we have the user and can proceed with the verification
          //after adding the userpassword to the response
          console.log('User found');
          next();
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
