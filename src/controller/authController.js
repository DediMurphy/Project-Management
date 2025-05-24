import prisma from "../db/index.js";
import sendResponse from "../middlewares/responseFormatter.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { signAccessToken, signRefreshToken, signToken, verifyRefreshToken } from "../utils/jwt.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password, roleId } = req.body;
    const existUser = await prisma.user.findUnique({ where: { email } });

    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        roleId
      },
    });

    sendResponse(res, {
      statusCode: 201,
      message: "User registered successfully",
      data: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({
      where: { username },
      include: { role: true },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = signAccessToken({
      user_id: user.user_id,
      role: user.role.role_name,
    });

    const refreshToken = signRefreshToken({
      user_id: user.user_id,
      role: user.role.role_name,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Login successful",
      data: {
        accessToken,
        user: {
          user_id: user.user_id,
          email: user.email,
          role: user.role.role_name,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      res.status(401);
      throw new Error("Refresh token not found");
    }

    const decode = verifyRefreshToken(token);
    const accessToken = signAccessToken({
      user_id: decode.user_id,
      role: decode.role,
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Token refreshed",
      data: { accessToken },
    });
  } catch (error) {
    res.status(403);
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    res.clearCookie("refreshToken");
    sendResponse(res, {
      statusCode: 200,
      message: "Logged out successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};