import express, { Express, Request, Response } from "express";
import expressOasGenerator from "express-oas-generator";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
expressOasGenerator.init(app, {});
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server. This is cool 😬");
});

app.delete("/kill_the_witch", (req: Request, res: Response) => {
  res.sendStatus(501);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}⚡️`);
});
