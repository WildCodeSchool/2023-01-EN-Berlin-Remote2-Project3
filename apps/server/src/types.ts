import { Request } from "express";
import * as jwt from "jsonwebtoken";

interface UserData {
  id: number;
  typeId: number;
  name: string;
  password: string;
}

export interface LoginRequest extends Request {
  body: { email: string; password: string };
  user?: UserData;
}

export interface LoginRequestWithData extends Request {
  body: { email: string; password: string };
  user: UserData;
}

export interface RequestUserInfo {
  userInfo: {
    id: number;
    name: string;
    typeId: number;
    type: string;
  };
}
export interface RequestDecodedToken {
  decodedToken: string | jwt.JwtPayload;
}

export interface RequestTableId {
  tableId: number;
}
