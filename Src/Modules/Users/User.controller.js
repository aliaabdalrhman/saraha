import userModel from "../../../DB/Models/User.model.js"

export const getAllUsers = async (req, res,next) => {
    const users = await userModel.find().select('userName');
    return res.status(200).json({ message: "success", users });
}