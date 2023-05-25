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

const getOrdersSortedByTable = async (req, res) => {
  const prismaQuery = {
    where: {
      orders: {
        some: {
          waiterId: req.userInfo.id,
        },
      },
    },
    select: {
      id: true,
      name: true,
      statusId: true,
      tableStatus: {
        select: {
          name: true,
        },
      },
      orders: {
        select: {
          id: true,
          menuItem: {
            select: {
              name: true,
              price: true,
            },
          },
          orderTime: true,
          statusId: true,
          status: {
            select: {
              name: true,
            },
          },
          waiterId: true,
          waiter: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  };
  prisma.tablePhysical
    .findMany(prismaQuery)
    .then((found) => {
      const result = found.map((table) => ({
        id: table.id,
        name: table.name,
        statusId: table.statusId,
        status: table.tableStatus.name,
        orders: table.orders.map((order) => ({
          id: order.id,
          name: order.menuItem.name,
          price: order.menuItem.price,
          orderTime: order.orderTime,
          statusId: order.statusId,
          status: order.status.name,
          waiterId: order.waiterId,
          waiter: order.waiter.name,
        })),
      }));
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving data from the database");
    });
};

tablesRouter.get("/mine", getOrdersSortedByTable);
