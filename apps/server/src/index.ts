import dotenv from "dotenv";
dotenv.config();

import express from "express";
import expressOasGenerator from "express-oas-generator";
import cors from "cors";
import { loginRouter } from "./routes/login";
import { PrismaClient } from "@prisma/client";
import { verifyToken, getUserById } from "./auth";

const app = express();
expressOasGenerator.init(app, {});
app.use(cors());

export const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server. This is amayzing 😬😬");
});

app.get("/api/verification", verifyToken, getUserById);

app.get("/api/tables", (_, res) => {
  prisma.tablePhysical.findMany().then((tableData) => {
    res.json(tableData);
  });
});

app.get("/api/menu", (req, res) => {
  const prismaQuery = {
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
          childCategories: {},
        },
      },
    },
    where: {
      parentId: {
        equals: null,
      },
    },
  };
  prisma.category
    .findMany(prismaQuery)
    .then((found) => {
      res.status(200).json(found);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from the database");
    });
  // res.json(mockData);
});

app.use(express.json());

app.use("/api/login", loginRouter);

// app.use((err, req, res, next) => {
//   console.error(err)
// })

const port = process.env.PORT ?? 4500;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}⚡️`);
});
