import express from "express";
import { verifyToken, getUserById } from "../auth";
import { prisma } from "..";

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
