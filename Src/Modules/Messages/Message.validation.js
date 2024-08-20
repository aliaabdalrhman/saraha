import joi from "joi";

export const sendMessageSchema = {
    body: joi.object({
        message: joi.string().min(3).max(100).required().messages({
            'string.empty': 'message is required',
            'string.min': 'message must be at least 3 characters long',
            'string.max': 'message cannot be more than 100 characters long'
        }),
    }),
    params: joi.object({
        receiverId: joi.string().length(24).messages({
            'string.length': 'receiverId length must be 24 characters long'
        }),
    })

}