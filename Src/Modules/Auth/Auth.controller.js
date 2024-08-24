import userModel from "../../../DB/Models/User.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { sendEmail } from "../../Utilities/SendEmail.js";
import { AppError } from "../../../GlobalError.js";
import { AppSuccess } from "../../../GlobalSuccess.js";

export const register = async (req, res, next) => {
    const { userName, email, password, cpassword } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
        return next(new AppError("Email already exists", 409));
    }
    else {
        const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
        const html = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Welcome Email</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                        }
                        .email-container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        .email-header {
                            text-align: center;
                            padding: 20px 0;
                            background-color: #007bff;
                            color: #ffffff;
                            border-radius: 10px 10px 0 0;
                        }
                        .email-body {
                            padding: 20px;
                            color: #333333;
                            line-height: 1.6;
                        }
                        .email-footer {
                            text-align: center;
                            padding: 10px;
                            color: #777777;
                            font-size: 12px;
                        }
                        .email-footer a {
                            color: #007bff;
                            text-decoration: none;
                        }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <div class="email-header">
                            <h1>Welcome to Sarahah!</h1>
                        </div>
                        <div class="email-body">
                            <p>Dear ${userName},</p>
                            <p>Thank you for signing up on our website! We’re thrilled to have you join our community. We hope you have an enjoyable and valuable experience. If you have any questions or need assistance, please don’t hesitate to reach out.</p>
                            <p>Best regards,<br>The Support Team</p>
                        </div>
                        <div class="email-footer">
                            <p>&copy; 2024 Saraha. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `;
        sendEmail(email, "Welcome to sarahah", html);
        await userModel.create({ userName, email, password: hashedPassword });
        return next(new AppSuccess("success", 201));
    }

}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return next(new AppError("user not found", 404))
    }
    else {
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return next(new AppError("invalid password", 404));
        }
        else {
            const token = jwt.sign({ id: user._id }, process.env.LOGINSIGNATURE, { expiresIn: "1h" });
            return next(new AppSuccess("success", 200, { token }));
        }
    }

}