import jwt from "jsonwebtoken";

export const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

export const signAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15"})
}

export const signRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7D"});
}

export const verifyAccessToken = (token) => jwt.verify(token, JWT_SECRET);
export const verifyRefreshToken = (token) => jwt.verify(token, JWT_REFRESH_SECRET);

