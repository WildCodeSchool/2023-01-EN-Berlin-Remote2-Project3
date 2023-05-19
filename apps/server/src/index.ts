import dotenv from "dotenv";
dotenv.config();

import express from "express";
import expressOasGenerator from "express-oas-generator";
import cors from "cors";
import { loginRouter } from "./routes/login";
import { PrismaClient } from "@prisma/client";
import { mockData } from "./mock/menuitems.data";

const app = express();
expressOasGenerator.init(app, {});
app.use(cors());

export const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server. This is amayzing 😬😬");
});

// TODO @george.surmava please replace this with actual implementation
app.get("/api/menu", (req, res) => {
  prisma.category.findMany({
    select: {
      id: true,
      name: true,
      menuItems: {
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
      childCategories: {
        select: {
          id: true,
          name: true,
          menuItems: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
          childCategories: {}, //supposed to be an empty array, so no fields selected
        },
      },
    },
    where: {
      parentId: {
        equals: null,
      },
    },
  }).then((found) => {
    res.status(200).json(found)
  }).catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from the database");
  })
  // res.json(mockData);
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
