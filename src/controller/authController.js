import prisma from "../db/index.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { signToken } from "../utils/jwt.js";

export const register = async (req, res, next) => {
    try {
        const { username, email, password} = req.body;
        const existUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existUser){
            return res.status(400).json({ message: 'User already exists'})
        }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {   
                username,            
                email,
                password: hashedPassword,
            }
        });

        res.status(201).json({message: 'User registered successfully', user: {id: user.id, email: user.email}});
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await prisma.user.findFirst({ where: { username } });

        if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = signToken({ id: user.id });

        res.cookie('token', token, {
        httpOnly: true,
        secure: false, // kalau production ganti ke true
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        next(error);
    }
}

export const protectedRoute = async (req, res, next) => {
    res.status(200).json({ message: 'Welcome to protected route', user: req.user });
  };


