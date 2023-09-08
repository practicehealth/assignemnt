import { NextFunction, Request, Response, Router } from "express";
import { newUserSession } from "../model/user.model";
import { Session } from "express-session";

interface userSession extends Session {
  userSession: newUserSession;
}

const validateRoutes = (req: Request, res: Response, next: NextFunction) => {
  const session = req.session as userSession;
  if (!session.userSession) {
    return res.status(400).send({
      message: "Bad request",
    });
  }
  next();
};

export { validateRoutes };
