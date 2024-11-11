import { NextFunction, Request, Response } from "express";
import { Logger } from "pino";

export class LogRoutes {
  constructor(private readonly logger: Logger) {}

  public handle(request: Request, _: Response, next: NextFunction) {
    if (!this.logger) {
      console.error("Logger is not defined");
      return next(new Error("Logger is not defined"));
    }

    this.logger.info(
      `[${request.method}] - ${request.protocol}://${request.get("host")}${
        request.originalUrl || request.url
      } - ${request.ip}`
    );
    next();
  }
}
