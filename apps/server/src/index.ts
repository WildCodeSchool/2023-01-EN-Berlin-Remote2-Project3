import dotenv from "dotenv";
dotenv.config();

import express from "express";
import expressOasGenerator from "express-oas-generator";
import cors from "cors";
import { loginRouter } from "./routes/login";
import { tablesRouter } from "./routes/tables";
import { PrismaClient } from "@prisma/client";
import { verifyToken, getUserByIdAndNext, sendUserInfo } from "./auth";

const app = express();
expressOasGenerator.init(app, {});
app.use(cors());

export const prisma = new PrismaClient();

app.get("/", async (req, res) => {
  res.send("Express + TypeScript Server. This is amayzing 😬😬");
});

app.get("/api/verification", verifyToken, getUserByIdAndNext, sendUserInfo);

app.use("/api/tables", tablesRouter);

const getMenuItemsSortedByCategory = async (req, res) => {
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
};

app.get("/api/menu", getMenuItemsSortedByCategory);

app.use(express.json());

app.use("/api/login", loginRouter);

// app.use((err, req, res, next) => {
//   console.error(err)
// })

const port = process.env.PORT ?? 4500;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}⚡️`);
});
