import "dotenv/config";
import { JwtPayload, sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const ACCESS_TOKEN_PROPERTIES = {
  expiresIn: process.env.JWT_EXPIRATION_TIME || "1h",
};

const generate = (payload: object): string => {
  return sign(payload, JWT_SECRET, ACCESS_TOKEN_PROPERTIES);
}

const verifyToken = (token: string): string | JwtPayload => {
  return verify(token, JWT_SECRET);
};

export { generate, verifyToken };


