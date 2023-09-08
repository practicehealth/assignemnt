import { date, object, string, number, TypeOf } from "zod";

export const userSignUpSchema = object({
  body: object({
    userName: string({
      required_error: "Username is required.",
    }),
    email: string({
      required_error: "Email is required.",
    }),
    password: string({
      required_error: "Password is required.",
    }),
    passwordConfirmation: string({
      required_error: "Password confirmation is required.",
    }),
    profile: object({
      firstName: string().nullable(),
      lastName: string().nullable(),
      dateOfBirth: date().nullable(),
      gender: string().nullable(),
      age: number().nullable(),
    }).nullish(),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Password does not match",
  }),
});

export type UserSignUpType = TypeOf<typeof userSignUpSchema>["body"];

export const userLoginSchema = object({
  body: object({
    userName: string({
      required_error: "Username is required.",
    }),
    password: string({
      required_error: "Password is required.",
    }),
  }),
});

export type UserLoginType = TypeOf<typeof userLoginSchema>["body"];

export const forgetPasswordSchema = object({
  body: object({
    userName: string({
      required_error: "Username is required.",
    }),
    password: string({
      required_error: "Password is required.",
    }),
    newPassword: string({
      required_error: "New Password is required.",
    }),
  }),
});

export type ForgetPasswordType = TypeOf<typeof forgetPasswordSchema>["body"];
