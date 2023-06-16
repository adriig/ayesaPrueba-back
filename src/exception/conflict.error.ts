import { StatusError } from "./status.error";

export class ConflictError extends StatusError {
  constructor(message: string) {
    super(409, message);
  }
}