import express from "express";
import { verifyToken, getUserByIdAndNext } from "../handlers/login";
import {
  getAllTables,
  getMyTablesWithOrders,
  getTableWithOrders,
  validateParamTableId,
} from "../handlers/tables";

// Base URL for this router is "/api/tables/" (check: index.ts)
export const tablesRouter = express.Router();

// All endpoints below require authorization and rely on the presence of
// a perperty "userInfo" that is attached to the request object.
// @ts-expect-error
tablesRouter.use(verifyToken, getUserByIdAndNext);

// GET "/api/tables/" resturns Table[]
tablesRouter.get("/", getAllTables);

// GET "/api/tables/mine" returns TableWithOrders[]
// @ts-expect-error
tablesRouter.get("/mine", getMyTablesWithOrders);

// Path param validator for any param called "id" (appears in paths as ":id")
// @ts-expect-error
tablesRouter.param("id", validateParamTableId);

// GET/POST/PUT "api/tables/:id"
tablesRouter
  .route("/:id")
  // @ts-expect-error
  .get(getTableWithOrders)
  .post(async (req, res) => {
    res.send("Items are ordered");
  })
  .put(async (req, res) => {
    res.send("Order is confirmed");
  });
