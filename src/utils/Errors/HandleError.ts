import { Request, Response, NextFunction } from "express";
import AppError from "./AppError";

const HandleError = (
  error: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  error.status = error.status || "error";
  error.statusCode = error.statusCode || 500;

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
}

export const GetError = (
  req: Request,
  _res: Response,
  next: NextFunction
) =>
  next(new AppError(404, `Route ${req.originalUrl} not found`));

export default HandleError;
