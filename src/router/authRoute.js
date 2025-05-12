import express from "express";
import { register, login ,protectedRoute, refreshAccessToken, getUser } from '../controller/authController.js'
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post('/register', register);
router.get("/refresh-token", refreshAccessToken);
router.post('/login', login);
router.get('/', getUser);
router.get('/protected', authMiddleware, protectedRoute);


export default router;