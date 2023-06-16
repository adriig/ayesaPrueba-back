import { Request, Response } from "express";
import 'express-async-errors';
import * as authService from "./auth.service";
import { AuthRequest } from "./interfaces";

const loginController = async ({ body }: Request, res: Response) => {
  const { username, password } = body;
  const result = await authService.login(username, password);

  res.send(result);
};

const registerController = async ({ body }: Request, res: Response) => {
  const { username, password } = body;
  const result = await authService.register(username, password);

  res.send(result);
}

const meController = async (req: AuthRequest, res: Response) => {
  const result = await authService.me(req.payload?.username);
  res.send(result);
}

export { loginController, meController, registerController };

