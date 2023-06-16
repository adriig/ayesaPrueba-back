import { StatusError } from "./status.error";

export class UnauthorizedError extends StatusError {
  constructor(message: string) {
    super(401, message);
  }
}