import express from "express";
import {
  verifyToken,
  getUserByIdAndNext,
  checkWaiter,
} from "../handlers/login";
import {
  getAllTables,
  getMyTablesWithOrders,
  getTableWithOrders,
  sendOrdersToDB,
  receiveOrders,
  validateParamTableId,
} from "../handlers/tables";

// Base URL for this router is "/api/tables/" (check: index.ts)
export const tablesRouter = express.Router();

// GET "/api/tables/" resturns Table[]
tablesRouter.get("/", getAllTables);

// All endpoints below require authorization and rely on the presence of
// a perperty "userInfo" that is attached to the request object.
// @ts-expect-error
tablesRouter.use(verifyToken, getUserByIdAndNext, checkWaiter);

// GET "/api/tables/mine" returns ResponseGetTablesMine[]
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
  // @ts-expect-error
  .post(receiveOrders)
  // @ts-expect-error
  .put(sendOrdersToDB);
