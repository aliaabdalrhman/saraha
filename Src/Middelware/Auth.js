import jwt from 'jsonwebtoken';
import { AppError } from '../../GlobalError.js';

export const auth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization?.startsWith(process.env.BERERTOKEN)) {
        return next(new AppError("Invalid authorization", 401));
    }
    const token = authorization.split(process.env.BERERTOKEN)[1];
    const decoded = jwt.verify(token, process.env.LOGINSIGNATURE);
    if (!decoded) {
        return next(new AppError("Invalid token", 401));
    }
    req.id = decoded.id;
    next();
}