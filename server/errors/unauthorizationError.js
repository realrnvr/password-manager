import CustomAPIError from "./customAPIError.js";
import { StatusCodes } from "http-status-codes";

class UnauthorizationError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthorizationError;
