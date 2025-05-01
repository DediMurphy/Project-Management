import express from "express";
import { register, login ,protectedRoute } from '../controller/authController.js'
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/protected', authMiddleware, protectedRoute);


export default router;