import mongoose from "mongoose";


const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a username'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        token: {
            type: String,
        }
    },
);

const User = mongoose.model("User", userSchema);

export default User;