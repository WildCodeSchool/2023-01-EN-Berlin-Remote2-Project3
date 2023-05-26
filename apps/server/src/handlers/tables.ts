import { prisma } from "..";
import { NextFunction, Request, Response } from "express";
import { RequestTableId, RequestUserInfo } from "../types";
import { queryMyTablesWithOrders, mapMyTablesWithOrders } from "prisma-queries";
import { unconfirmedOrders } from "../unconfirmedOrders";

export const getAllTables = async (_: Request, res: Response) => {
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

export const getMyTablesWithOrders = async (
  req: Request & RequestUserInfo,
  res: Response
) => {
  const prismaQuery = {
    ...queryMyTablesWithOrders(req.userInfo.id),
  };
  const resultMapping = mapMyTablesWithOrders;
  prisma.tablePhysical
    .findMany(prismaQuery)
    .then(resultMapping)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving data from the database");
    });
};

export const validateParamTableId = async (
  req: Request & RequestTableId,
  res: Response,
  next: NextFunction
) => {
  const { id: idParam } = req.params;
  const id = Number.parseInt(idParam);
  if (Number.isNaN(id)) {
    res.status(400).send("Invalid url");
  } else {
    prisma.tablePhysical
      .count({ where: { id: id } })
      .then((count) => {
        if (count === 1) {
          req.tableId = id;
          next();
        } else if (count === 0) {
          res.status(404).send("No table exists for the provided id");
        } else {
          res
            .status(500)
            .send(
              "Corrupted database records: multiple tables for the provided id"
            );
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving data from the database");
      });
  }
};

export const getTableWithOrders = async (
  req: Request & RequestTableId,
  res: Response
) => {
  const prismaQuery = {
    where: {
      tableId: req.tableId,
    },
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
  };
  prisma.order
    .findMany(prismaQuery)
    .then((found) => {
      const result = found.map((order) => ({
        id: order.id,
        name: order.menuItem.name,
        price: order.menuItem.price,
        orderTime: order.orderTime,
        statusId: order.statusId,
        status: order.status.name,
        waiterId: order.waiterId,
        waiter: order.waiter.name,
      }));
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving data from the database");
    });
};

export const receiveOrders = async (
  req: Request & RequestUserInfo,
  res: Response,
  next: NextFunction
) => {
  const requestOrders = req.body?.orders;
  //validate itemId - array of menu ids
  if (
    Array.isArray(requestOrders) &&
    requestOrders.every((order) => Number.isInteger(order))
  ) {
    const validOrders: number[] = requestOrders;
    const order = {
      unique: Math.floor(Math.random() * 1000000),
      orders: validOrders.map((order) => ({
        itemId: order,
        statusId: 1,
        waiterId: req.userInfo.id,
        tableId: req.tableId,
      })),
    };
    unconfirmedOrders.push(order);
    res.status(202).json({ code: order.unique });
  } else {
    res.status(400).send("Invalid order request");
  }
};

export const postOrdersToDB = async (
  req: Request & RequestUserInfo,
  res: Response,
  next: NextFunction
) => {
  const code = req.body?.code;
  if (Number.isInteger(code) && code >= 0 && code.toString().length <= 6) {
    const validCode: number = code;
    const orderIndex = unconfirmedOrders.findIndex(
      (orders) => orders.unique === validCode
    );
    if (orderIndex > -1) {
      const ordersFound = unconfirmedOrders[orderIndex].orders;
      prisma.order
        .createMany({ data: ordersFound })
        .then((created) => {
          //remove the unconfirmed order from the server database
          unconfirmedOrders.splice(orderIndex, 1);
          if (created.count === ordersFound.length) {
            //add the link to the created resources?
            res.status(201).send(`${created.count} records were updated`);
          } else {
            res
              .status(500)
              .send("Error updating the database: not all items were ordered");
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Error updating the database");
        });
    } else {
      res
        .status(409)
        .send(
          "No such order present on the server: either it has already been confirmed or it has never been initialized"
        );
    }
  } else {
    res.status(400).send("Invalid confirmation code");
  }
};
