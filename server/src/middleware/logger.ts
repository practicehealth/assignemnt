import { NextFunction, Request, Response } from "express";
import Logging from "../lib/color";

const logger = (req: Request, res: Response, next: NextFunction) => {
  Logging.info(
    `Incoming -> Method: [${req.method}] - Route: [${req.url}] IP: [${req.socket.remoteAddress}]`
  );
  res.on("finish", () => {
    Logging.info(
      `Outgoing -> Method: [${req.method}] - Route: [${req.url}] IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
    );
  });
  next();
};

export default logger;