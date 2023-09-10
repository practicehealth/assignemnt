import UserModel from "../models/UserModel";
import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import { sentToken } from "../utils/sentToken"
import crypto from "crypto";
import { sentEmail } from "../utils/sendEmail";
import jwt, { Secret } from "jsonwebtoken";
const JWT_SECRET_KEY: Secret = process.env.JWT_SECRET || "DONTJudgeTheSkillsOfAProrammer?SHA256Hash";

export const signup = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password, gender, dob } = req.body;
    const user = await UserModel.create({
        username,
        email,
        password,
        gender,
        dob,
    });
    sentToken(user, 200, res);
});


export const login = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 404));
    }
    const user: any = await UserModel.findOne({ email });

    if (!user) {
        return next(new ErrorHandler("Invalid email or password entered", 404));
    }
    const isPasswordMatched: Boolean = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid username or password", 404));
    }

    sentToken(user, 200, res);
});


export const logout = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    return res.clearCookie("token").status(200).json({
        success: true,
        message: "user logout successfully",
    });
});


export const forgotPassword = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const user: any = await UserModel.findOne({
        email: req.body.email,
    });
    if (!user) {
        return next(new ErrorHandler("User Not Found", 404));
    }

    //Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `http://localhost:5173/resetpasswordtoken/${resetToken}`;
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`;

    try {
        await sentEmail(req.body.email, "Spotlight Forgot Password link", message)
        res.status(200).json({
            success: true,
            message: `Reset url sent to ${user.email} successfully ! Please check your email.`,
        });
    } catch (error: any) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});



//Reset Password
export const resetPassword = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    console.log({
        token: req.params.token,
        email: req.body.email
    })
    //Creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    const email = req.body.email;
    const user: any = await UserModel.findOne({
        resetPasswordToken,
        email,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
        return next(
            new ErrorHandler(
                "Reset Password Token Isnt Valid or has been expired",
                400
            )
        );
    }
    if (req.body.password !== req.body.cPassword) {
        return next(new ErrorHandler("Password doesnt match !", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sentToken(user, 200, res);
});


export const getUserDetails = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = req.params.token;
    if (!jwtToken) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }
    const decodeData: { "id": string } | undefined | any = jwt.verify(jwtToken, JWT_SECRET_KEY);
    const user: any = await UserModel.findById(decodeData.id.toString());
    if (!user) {
        return next(new ErrorHandler("Something went wrong", 401));
    }
    user.password = undefined;
    user.username = user.username.split(" ")[0];
    return res.status(200).json({
        success: true,
        isLoggedIn: true,
        user,
    });
});