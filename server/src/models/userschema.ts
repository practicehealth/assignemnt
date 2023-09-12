import mongoose, { Document, Model, Schema } from "mongoose";

// Define the user schema interface
interface IUser extends Document {
    fullname: string;
    email: string;
    password: string;
    dob: Date;
    gender: string;
    mobileno: number;

}

// Define the user schema
const userSchema: Schema<IUser> = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    mobileno: {
        type: Number,
        required: true,
    },
});

// Define the User model
const UserModel: Model<IUser> = mongoose.model<IUser>('account', userSchema);

export default UserModel;
