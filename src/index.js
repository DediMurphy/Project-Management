import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./router/authRoute.js";
import taskRoute from "./router/taskRoute.js";
import workingHistoryRoute from "./router/worklogRoute.js";
import { errorHandler, NotFound } from "./middlewares/errorMiddleware.js";
import projectRoutes from './router/projectRoute.js';
import roleRoutes from './router/roleRoute.js';
import adminRoutes from './router/adminRoute.js'
import cors from 'cors';

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, 
    methods: ['GET', 'POST', "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/task', taskRoute);
app.use('/api/v1/workingHistory', workingHistoryRoute);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/roles', roleRoutes)
app.use('/api/v1/admin', adminRoutes)

app.get('/', (req, res) => {
    res.send('Auth API is running 🚀');
});

app.use(errorHandler);
app.use(NotFound);

export default app;