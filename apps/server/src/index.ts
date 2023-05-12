import express, { Express, Request, Response } from "express";
import expressOasGenerator from "express-oas-generator";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const { verifyPassword } = require("./auth");

const app: Express = express();
const prisma = new PrismaClient();
expressOasGenerator.init(app, {});
dotenv.config();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server. This is amayzing 😬😬");
});

app.use(express.json());

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
    prisma.user
      .findUnique({
        select: { id: true, password: true },
        where: { email: req.body.email },
      })
      .then((found) => {
        if (found == null) {
          res.status(404).send("Wrong email or password");
        } else {
          // now we have the user and can proceed with the verification
          //after adding the userpassword to the response
          console.log("User found");
          req.body.user = found;
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

// app.use((err, req, res, next) => {
//   console.error(err)
// })

const port = process.env.PORT ?? 4500;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}⚡️`);
});
