import messageModel from "../../../DB/Models/Message.model.js";
import userModel from "../../../DB/Models/User.model.js";
import { AppError } from "../../../GlobalError.js";

export const sendMessage = async (req, res, next) => {
    const { message } = req.body;
    const { receiverId } = req.params;
    const user = await userModel.findById(receiverId);
    if (!user) {
        return next(new AppError("User not found", 404));
    }
    else {
        const Message = await messageModel.create({ message, receiverId });
        return res.status(201).json({ message: "success", Message });

    }
}

export const getMessages = async (req, res, next) => {
    const messages = await messageModel.find({ receiverId: req.id });
    return res.status(200).json({ message: "success", messages });
}