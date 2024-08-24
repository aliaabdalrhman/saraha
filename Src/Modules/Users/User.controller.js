import userModel from "../../../DB/Models/User.model.js"
import { AppSuccess } from "../../../GlobalSuccess.js";

export const getAllUsers = async (req, res, next) => {
    const users = await userModel.find().select('userName');
    return next(new AppSuccess("success", 200, { users }))
}