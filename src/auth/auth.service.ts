
import { NotFoundError, UnauthorizedError } from "../exception";
import { ConflictError } from "../exception/conflict.error";
import { User } from "../user/interfaces/user.model";
import * as userService from "../user/user.service";
import * as bcrypt from "./handlers/bcrypt.handler";
import * as jwt from "./handlers/jwt.handler";
import { AuthResult } from "./interfaces/auth-result.model";

const login = async (
  username: string,
  password: string
): Promise<AuthResult> => {
  const user = await userService.findUserByUsername(username);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const verified = await bcrypt.verify(
    password,
    user.password
  );

  if (!verified) {
    throw new UnauthorizedError("Invalid password");
  }

  return {
    token: jwt.generate({ username })
  };
};

const register = async (
  username: string,
  password: string
): Promise<AuthResult> => {
  const query = await userService.findUserByUsername(username);
  if (query) {
    throw new ConflictError("User already exists");
  }

  const hashedPassword = await bcrypt.encrypt(password);
  const token = jwt.generate({ username });

  try {
    await userService.create(
      username,
      hashedPassword,
      token
    );

    return {
      token
    };
  } catch (error) {
    throw new ConflictError("User could not be created");
  }
}

const me = async (username: string | undefined): Promise<User> => {
  if (!username) {
    throw new ConflictError("You must provde an username");
  }

  const user = await userService.findUserByUsername(username);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
}

export { login, me, register };

