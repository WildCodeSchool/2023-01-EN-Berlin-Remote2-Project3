import { prisma } from "..";
import { NextFunction, Request, Response } from "express";
import { RequestTableId, RequestUserInfo } from "../types";
import { queryMyTablesWithOrders, mapMyTablesWithOrders } from "prisma-queries";
import { unconfirmedOrders } from "../unconfirmedOrders";
import { isArray } from "util";

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

export const validateOrder = async (
  req: Request & RequestUserInfo,
  res: Response,
  next: NextFunction
) => {
  const requestOrders = req.body?.orders;
  
  //validate itemId - array of menu ids
  const validateOrders = (thing: any) =>
    Array.isArray(thing) && thing.every((order) => Number.isInteger(order));
  
  if (
    Array.isArray(orders) &&
    orders.every((order) => Number.isInteger(order))
  ) {
    // itemId     Int           @map("item_id")       request body - array!
    // orderTime  DateTime      @map("order_time")    added automatically?
    // statusId   Int           @map("status_id")     default value
    // waiterId   Int           @map("waiter_id")     token (stored in req)
    // tableId    Int           @map("table_id")      param (stored in req)

    // ALSO ADD THE UNIQUE IDENTIFIER
    orders.map((order) => ({
      itemId: order,
      statusId: 123, //CHECK THE ID OF THE DEFAULT STATUS
      waiterId: req.userInfo.id,
      tableId: req.tableId,
    }));
    unconfirmedOrders.push(orders);
    res.json({ success: true /*ADD IDENTIFIER*/ });
  } else {
    res.status(400).send("Wrong email or password");
  }
};

export const postOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //
};
