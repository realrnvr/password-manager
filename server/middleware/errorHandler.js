import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (err, req, res, next) => {
  let errorObj = {
    message: err.message || "Something went wrong, Please try again later!",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.name === "ValidationError") {
    errorObj.message = Object.values(err.errors)
      .map((errorItem) => {
        return errorItem.kind === "minlength"
          ? `Password must be longer than ${errorItem.properties.minlength} characters.`
          : errorItem.message;
      })
      .join(", ");
    errorObj.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === 11000) {
    errorObj.message = "An account with this email already exists.";
    errorObj.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name === "CastError") {
    errorObj.message = `There is no such password with id: ${err.value}`;
    errorObj.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(errorObj.statusCode).json({ msg: errorObj.message });
  // return res.status(500).json({ err });
};
