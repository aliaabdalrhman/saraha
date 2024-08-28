import userModel from "../../../DB/Models/User.model.js"
import { AppSuccess } from "../../../GlobalSuccess.js";
import cloudinary from "../../Utilities/Cloudinary.js";

export const getAllUsers = async (req, res, next) => {
    const users = await userModel.find().select('userName');
    return next(new AppSuccess("success", 200, { users }))
}

export const uploadImage = async (req, res,next) => {
    const { secure_url } = await cloudinary.uploader.upload(req.file.path);
    const user = await userModel.findByIdAndUpdate(req.id, { profilePic: secure_url });
    return next(new AppSuccess("success", 200));
}