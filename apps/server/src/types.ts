import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { Order } from "@prisma/client";

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

type AddOrder = Omit<Order, "id" | "orderTime" | "servedTime">;

export interface UnconfirmedOrder {
  unique: number;
  orders: AddOrder[];
}