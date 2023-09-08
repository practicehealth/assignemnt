import { Schema, model, Document, Model } from "mongoose";
import { UserSignUpType } from "../schema/user.schema";

export interface newUserSession {
  userName: string;
  email: string;
  authorization: boolean
}

interface UserDoc extends Document, UserSignUpType {
  userSessionData(): newUserSession;
}

interface UserModel extends Model<UserDoc> {}

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profile: {
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    age: {
      type: Number,
      default: null,
    },
  },
});

UserSchema.methods.userSessionData =
  function userSessionData(): newUserSession {
    return {
      email: this.email,
      userName: this.userName,
      authorization: true
    };
  };

const User = model<UserDoc, UserModel>("User", UserSchema);

export default User;
