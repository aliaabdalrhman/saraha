import messageModel from "../../../DB/Models/Message.model.js";
import userModel from "../../../DB/Models/User.model.js";
import { AppError } from "../../../GlobalError.js";
import { AppSuccess } from "../../../GlobalSuccess.js";

export const sendMessage = async (req, res, next) => {
    const { message } = req.body;
    const { receiverId } = req.params;
    const user = await userModel.findById(receiverId);
    if (!user) {
        return next(new AppError("User not found", 404));
    }
    else {
        const Message = await messageModel.create({ message, receiverId });
        return next(new AppSuccess("success", 201, { Message }));
    }
}

export const getMessages = async (req, res, next) => {
    const messages = await messageModel.find({ receiverId: req.id });
    return next(new AppSuccess("success", 200, { messages }));
}