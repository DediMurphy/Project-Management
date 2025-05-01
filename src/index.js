import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./router/authRoute.js";
import taskRoute from "./router/taskRoute.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tasks', taskRoute);

app.get('/', (req, res) => {
    res.send('Auth API is running 🚀');
});

app.use(errorHandler);

export default app;