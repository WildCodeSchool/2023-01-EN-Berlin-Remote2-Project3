import { Request } from "express";

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