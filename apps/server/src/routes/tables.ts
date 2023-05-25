import express from "express";
import { verifyToken, getUserByIdAndNext } from "../authHandlers";
import {
  getPhysicalTables,
  getAllOrdersSortedByTable,
  getOrdersByTable,
  validateParamTableId,
} from "../tableHandlers";

export const tablesRouter = express.Router();

tablesRouter.get("/", getPhysicalTables);

tablesRouter.use(verifyToken, getUserByIdAndNext);

tablesRouter.get("/mine", getAllOrdersSortedByTable);

tablesRouter.param("id", validateParamTableId);

tablesRouter
  .route("/:id")
  .get(getOrdersByTable)
  .post(async (req, res) => {
    res.send("Items are ordered");
  })
  .put(async (req, res) => {
    res.send("Order is confirmed");
  });
