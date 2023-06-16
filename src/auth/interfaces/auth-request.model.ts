import { Request } from "express";

export interface AuthRequest extends Request {
  payload?: { username: string };
}