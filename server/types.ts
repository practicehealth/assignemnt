import { Request} from "express";

export interface IRequest extends Request {
    session: any,
}

export interface IResponse {
    data?: any,
    msg: string,
    ok: boolean,
    err?: Error,
}

export interface IUser {
    userName: string;
    email: string;
    password: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    gender?: string;
    phoneNumber?: string;
}
