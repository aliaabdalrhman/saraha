import messageModel from "../../../DB/Models/Message.model.js";
import userModel from "../../../DB/Models/User.model.js";
import jwt from 'jsonwebtoken'
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
export const getMessage = async (req, res) => {
    try {
        const { token } = req.headers;
        const decoded = jwt.verify(token, process.env.LOGINSIGNATURE);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" })
        }
        else {
            const id=decoded.id;
            const user = await userModel.findById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            else {
                const messages = await messageModel.find({ receiverId: id });
                return res.status(200).json({ message: "success", messages });
            }
        }

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.stack });
    }
}