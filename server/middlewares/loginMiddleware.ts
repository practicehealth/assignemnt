import catchAsyncErrors from "./catchAsyncErrors";
import jwt, { Secret } from "jsonwebtoken";
import UserModel from "../models/UserModel";
import ErrorHandler from "../utils/errorHandler";
import { NextFunction, Request, Response } from "express";
const JWT_SECRET_KEY: Secret = process.env.JWT_SECRET || "DONTJudgeTheSkillsOfAProrammer?SHA256Hash";

export const isAuthenticatedUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401))
    }
    const decodeData: { "id": string } | undefined | any = jwt.verify(token, JWT_SECRET_KEY);
    const user: any = await UserModel.findById(decodeData.id.toString());
    if (!user) {
        return next(new ErrorHandler("Something went wrong", 401));
    }
    req.session.user = user;
    next();
});


