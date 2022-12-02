import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import HttpStatus from 'http-status-codes'

export const validate =
  (schema: AnyZodObject) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: "fail",
          errors: error.errors,
        });
      }
      next(error);
    }
  };
