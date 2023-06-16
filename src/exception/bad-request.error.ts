import { StatusError } from "./status.error";

export class BadRequestError extends StatusError {
  constructor(message: string) {
    super(400, message);
  }
}