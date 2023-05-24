import express from "express";
import { verifyToken, getUserByIdAndNext } from "../auth";
import { prisma } from "../index";

export const tablesRouter = express.Router();

const getPhysicalTables = async (_, res) => {
  prisma.tablePhysical
    .findMany()
    .then((tableData) => {
      res.json(tableData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from the database");
    });
};

tablesRouter.get("/", getPhysicalTables);

tablesRouter.use(verifyToken, getUserByIdAndNext);

const getOrderItemsSortedByTable = async (req, res) => {
  prisma.order
    .findMany({
      where: {
        waiterId: req.userInfo.id,
      },
      select: {
        table: {
          select: {
            id: true,
            name: true,
          },
        },
        orderItems: {
          select: {
            id: true,
            menuItem: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
      },
    })
    .then((found) => {
      //Data needs to be restructured, since we haven't made the DB migration yet
      const result = found.map((orderObject) => ({
        id: orderObject.table.id,
        name: orderObject.table.name,
        orders: orderObject.orderItems.map((orderItem) => ({
          id: orderItem.id,
          name: orderItem.menuItem.name,
          status: "status not implemented",
          price: orderItem.menuItem.price,
        })),
      }));
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving data from the database");
    });
};

tablesRouter.get("/mine", getOrderItemsSortedByTable);
