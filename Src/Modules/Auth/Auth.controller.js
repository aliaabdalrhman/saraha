import userModel from "../../../DB/Models/User.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "Email already exists" });
        }
        else {
            const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
            await userModel.create({ userName, email, password: hashedPassword });
            return res.status(201).json({ message: "success" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.stack });
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }
    else {
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ message: "invalid password" });
        }
        else {
            const token = jwt.sign({ id: user._id }, process.env.LOGINSIGNATURE, { expiresIn: "1h" });
            return res.status(200).json({ message: "success", token });
        }
    }
}