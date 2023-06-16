import { StatusError } from "./status.error";

export class NotFoundError extends StatusError {
  constructor(message: string) {
    super(404, message);
  }
}