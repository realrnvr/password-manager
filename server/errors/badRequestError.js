import CustomAPIError from "./customAPIError.js";
import { StatusCodes } from "http-status-codes";

class badRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default badRequestError;
