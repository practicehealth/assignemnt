import { Request, Response, Router } from "express";
import {
  UserLoginType,
  UserSignUpType,
  userLoginSchema,
  userSignUpSchema,
} from "../schema/user.schema";
import { validateResources } from "../middleware/validateResources";
import User, { newUserSession } from "../model/user.model";
import { toHash } from "../utils/hashPassword";
import bcrypt from "bcrypt";
import { Session } from "express-session";
import Logging from "../lib/color";

const router = Router();

interface userSession extends Session {
  userSession: newUserSession;
}

router.post(
  "/signup",
  validateResources(userSignUpSchema),
  async (req: Request<{}, {}, UserSignUpType>, res: Response) => {
    const { userName, email, password } = req.body;
    const userFound = await User.findOne({ userName });
    if (userFound) {
      res.status(409).json({
        error: "User Already exists!",
      });
      return;
    }
    const hashPassword = await toHash(password);
    const user = new User({
      email,
      password: hashPassword,
      userName,
    });
    user.save();
    res.status(201).json({
      message: `${userName} successfully created`,
    });
  }
);

router.post(
  "/login",
  validateResources(userLoginSchema),
  async (req: Request<{}, {}, UserLoginType>, res: Response) => {
    const { userName, password } = req.body;
    const userFound = await User.findOne({ userName });
    if (!userFound) {
      res.send(400).json({
        message: `${userName} not found`,
      });
      return;
    }
    const isPassMatched = await bcrypt.compare(password, userFound.password);
    if (!isPassMatched) {
      res.status(401).json({
        message: `${userName} password incorrect`,
      });
      return;
    }
    const session = req.session as userSession;
    session.userSession = userFound.userSessionData();

    res.status(200).json({
      message: `${userName} is successfully login`,
    });
  }
);
router.get("/logout", (req: Request, res: Response) => {
  req.session.destroy(function (err) {
    if (err) {
      Logging.error(err);
    }
  });
  return res.status(200).send({
    message: "logout successfully.",
  });
});

router.get("/verify", (req: Request, res: Response) => {
  const session = req.session as userSession;
  if (!session.userSession) {
    res.status(400).send({
      message: "bad request error!",
    });
    return;
  }
  res.status(200).send({
    userInfo: session.userSession,
  }); 
});

export default router;
