import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization?.startsWith(process.env.BERERTOKEN)) {
            return res.status(401).json({ message: "Invalid authorization" })
        }
        const token = authorization.split(process.env.BERERTOKEN)[1];
        const decoded = jwt.verify(token, process.env.LOGINSIGNATURE);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" })
        }
        req.id = decoded.id;
        next();
}