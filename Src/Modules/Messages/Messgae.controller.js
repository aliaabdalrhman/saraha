import messageModel from "../../../DB/Models/Message.model.js";
import userModel from "../../../DB/Models/User.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { receiverId } = req.params;
        const user = await userModel.findById(receiverId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        else {
            const Message = await messageModel.create({ message, receiverId });
            return res.status(201).json({ message: "success", Message });

        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.stack });
    }


}
