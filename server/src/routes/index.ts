import { Request, Response, Router } from "express";
import auth from "./auth.routes";
import user from "./user.routes";

const router = Router();

router.use("/auth", auth);
router.use("/api/user", user);

export default router;
