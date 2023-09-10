import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";
import crypto, { BinaryLike } from "crypto";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcryptjs";
const JWT_SECRET_KEY: Secret = process.env.JWT_SECRET || "DONTJudgeTheSkillsOfAProrammer?SHA256Hash";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "5d";

interface User extends Document {
  username: string;
  email: string | number | boolean | object;
  password: string;
  gender: string;
  dob: string;
  createdAt: Date;
  resetPasswordToken: string,
  resetPasswordExpire: Date,
};

interface InstanceMethods {
  comparePassword: (param1: string) => Promise<boolean>;
  getResetPasswordToken: () => String;
  getJWTToken: () => String;
}

const userSchema = new Schema<User, {}, InstanceMethods>({
  username: {
    type: String,
    required: [true, "Please enter username"],
    maxlength: [20, 'username cannot be more than 20 characters.'],
    minlength: [3, 'username cannot be less than 3 characters.']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    validate: [validator.isEmail, 'Please enter a valid email.'],
    unique: [true, 'email already exists.']
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [5, 'Password must be atleast 8 characters.'],
    maxlength: [25, 'Password cannot be more than 25 characters.']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required.'],
  },
  dob: {
    type: String,
    required: [true, 'Date of birth is required.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: {
    type: String || undefined,
    default: undefined,
  },
  resetPasswordExpire: {
    type: Date || undefined,
    default: undefined,
  },
});



userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//JWt token 
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE,
  });
}

// Compare Password 
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

//Generating Password reset token 
userSchema.methods.getResetPasswordToken = function (): String {
  // Generating token 
  const resetToken: BinaryLike = crypto.randomBytes(20).toString("hex");

  //Hashing and adding to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
}

const UserModel = mongoose.model<User>("User", userSchema, 'Users');

export default UserModel;
