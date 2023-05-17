import express from "express";
import {
  validateRequestEmailPassword,
  getUserByEmailPassword,
  verifyPassword,
} from "../auth";

export const loginRouter = express.Router();

loginRouter.post(
  "/",
  validateRequestEmailPassword,
  getUserByEmailPassword,
  // verifyPassword middleware expects a user property
  // and the previous middleware does always add that property
  // but it isn't seen by typescript, so
  // @ts-expect-error
  verifyPassword
);