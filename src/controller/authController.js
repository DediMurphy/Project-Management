import prisma from "../db/index.js";
import sendResponse from "../middlewares/responseFormatter.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { signAccessToken, signRefreshToken, signToken, verifyRefreshToken } from "../utils/jwt.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
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
      },
    });

    sendResponse(res, {
      statusCode: 201,
      message: "User registered successfully",
      data: {
        user_id: user.user_id,
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

    const user = await prisma.user.findFirst({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = signAccessToken({user_id: user.user_id});
    const refreshToken = signRefreshToken({user_id: user.user_id});

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Login successful",
      data: {
        accessToken,
        user: {
          user_id: user.user_id,
          email: user.email,
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
    const accessToken = signAccessToken({user_id: decode.user_id});

    sendResponse(res, {
      statusCode: 200,
      message: "Token refreshed",
      data: { accessToken },
    });
  } catch (error) {
    res.status(403);
    next(error);
  }
}

export const getUser = async (req, res, next) => {
  try {
    // Jika ingin mendapatkan semua user, pastikan data sensitif tidak dikembalikan
    const users = await prisma.user.findMany({
      select: {
        user_id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        // password tidak diikutsertakan
      }
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Users retrieved successfully",
      data: users,
    }); 
  } catch (error) {
    // Pastikan error dilewatkan ke middleware error handler
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    // Mengambil data user dari token yang sudah di-decode di middleware auth
    const userId = req.user.user_id;
    
    const user = await prisma.user.findUnique({
      where: { user_id: userId },
      select: {
        user_id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      }
    });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    sendResponse(res, {
      statusCode: 200,
      message: "User profile retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const protectedRoute = (req, res, next) => {
  try {
    sendResponse(res, {
      statusCode: 200,
      message: "Welcome to protected route",
      data: req.user,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res, next) => {
  try {
    // Hapus refresh token cookie
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