import CustomAPIError from "./customAPIError.js";
import { StatusCodes } from "http-status-codes";

class notFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default notFoundError;
