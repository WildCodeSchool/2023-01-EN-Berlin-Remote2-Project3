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
  verifyPassword
);