import express from "express";
import {
  validateRequestEmailPassword,
  getUserByEmailPassword,
  verifyPassword,
  verifyToken,
  getUserByIdAndNext,
  sendUserInfo,
} from "../handlers/login";

export const loginRouter = express.Router();

loginRouter
  .route("/")
  .post(
    validateRequestEmailPassword,
    getUserByEmailPassword,
    // incompatible request error
    // @ts-expect-error
    verifyPassword
  )
  .get(
    // incompatible request error
    // @ts-expect-error
    verifyToken,
    getUserByIdAndNext,
    sendUserInfo
  );
