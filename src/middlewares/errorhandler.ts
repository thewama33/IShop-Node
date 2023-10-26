//? Errors Types

import { Request, Response, NextFunction } from "express";

// Operational Errors
//      - problems that we can predict will happen at some point
// - invalid input
// - invalid path
// - failed to connect server
// -  Request Timeout

// Programming Errors

export class ErrorHandler {
  public static handle(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const statusCode: any = res.statusCode || 500;
    const message = err.message || "An error occurred";
    const error = process.env.NODE_ENV === "development" ? err : {};

    res.status(statusCode).json({
      code: statusCode,
      error: message,
    });
  }

  public static asyncWrapper(fn: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch((err) => {
        ErrorHandler.handle(err, req, res, next);
      });
    };
  }
}
