import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true
});

const messageModel = model('Message', messageSchema);

export default messageModel;