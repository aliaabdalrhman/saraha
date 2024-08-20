import userModel from "../../../DB/Models/User.model.js"

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('userName');
        return res.status(200).json({ message: "success", users });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.stack });
    }

}