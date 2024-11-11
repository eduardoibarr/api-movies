import pino from "pino";

export class Logger {
  private logger = pino({
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: true,
      },
    },
  });

  public getLogger() {
    return this.logger;
  }
}
