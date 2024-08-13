import joi from 'joi'
import { generalFields } from '../../Middelware/validation.js'

export const registerSchema = {
    body: joi.object({
        userName: joi.string().min(3).max(20).required().messages({
            'string.empty': 'Username is required',
            'string.min': 'Username must be at least 3 characters long',
            'string.max': 'Username cannot be more than 20 characters long'
        }),
        email: generalFields.email,
        password: generalFields.password,
        cpassword: joi.valid(joi.ref('password')).required().messages({
            'any.only': 'Passwords must match'
        }),
        age: joi.number().positive().integer().optional().messages({
            'number.base': 'Age must be a positive integer'
        }),
    })
}

export const loginSchema = {
    body: joi.object({
        email: generalFields.email,
        password: generalFields.password,
    })
}