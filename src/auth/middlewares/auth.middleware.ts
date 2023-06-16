import { NextFunction, Response } from "express";
import { UnauthorizedError } from "../../exception";
import { BadRequestError } from "../../exception/bad-request.error";
import * as jwt from "../handlers/jwt.handler";
import { JwtAuthPayload } from "../interfaces";
import { AuthRequest } from "../interfaces/auth-request.model";

const isAuthenticated = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authorization = req.headers.authorization || "";
  const token = authorization.split(" ").pop();
  if (!token) {
    throw new UnauthorizedError("You must provide a token to access this route");
  }

  try {
    const payload = jwt.verifyToken(token) as JwtAuthPayload;
    if (!payload) {
      throw new BadRequestError("Invalid token");
    }
    req.payload = payload;
    next();
  } catch (exception) {
    throw new UnauthorizedError("Expired token or invalid token");
  }
}

export default isAuthenticated;
