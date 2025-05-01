import { verifyToken } from "../utils/jwt.js";

function authMiddleware(req,res,next) {
    const token = req.cookies.token || '';

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied'});
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid'});
    }
}

export default authMiddleware;