import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiErrorHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const errorHandler = (
  err: Error | ApiError | ApiResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle ApiResponse thrown as error (incorrect usage)
  if (err instanceof ApiResponse) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      success: err.success,
      message: err.message,
      data: err.data,
    });
  }

  // Handle ApiError
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      success: false,
      message: err.message,
      data: null,
      errors: err.error,
    });
  }

  // Handle generic errors
  console.error("Error:", err);
  return res.status(500).json({
    statusCode: 500,
    success: false,
    message: err.message || "Internal Server Error",
    data: null,
  });
};
