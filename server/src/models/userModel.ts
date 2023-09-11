import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  password: string;
  name: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: number | null;
}

const userSchema: Schema<UserDocument> = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
