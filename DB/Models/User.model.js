import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    profilePic:{
        type: String,
    }

}, {
    timestamps: true
});

const userModel = model('User', userSchema);

export default userModel;