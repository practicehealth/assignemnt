import { Response } from "express";

const COOKIE_EXPIRE: number = 5;

export const sentToken = (user: any, statusCode: number, res: Response) => {

    const token = user.getJWTToken();

    //options for cookies 
    const options = {
        expires: new Date(
            Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly : true ,

    };

    res.cookie('token', token, options).status(statusCode).json({
        success: true,
        user,
        token,
    });
}

