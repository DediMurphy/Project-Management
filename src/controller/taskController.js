import sendResponse from '../middlewares/responseFormatter.js';
import * as taskService from '../service/taskService.js';

export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await taskService.getAllTasks();
        sendResponse(res, {
            statusCode: 200,
            message: "Tasks retrieved successfully",
            data: tasks,
        })
    } catch (error) {
        next(error)
        // res.status(500).json({ message: error.message });
    }
};

export const getTaskById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id); 
        const task = await taskService.getTaskById(id);
        sendResponse(res, {
            statusCode: 200,
            message: "Task retrieved successfully",
            data: task,
        });
    } catch (error) {
        next(error)
        // res.status(404).json({ message: error.message });
    }
};

export const createTask = async (req, res) => {
    try {
        const taskData = req.body;
        const task = await taskService.createNewTask(taskData);
        sendResponse(res, {
            statusCode: 201,
            message: "Task created successfully",
            data: task,
        });
    } catch (error) {
        next(error);
        // res.status(400).json({ message: error.message });
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const taskData = req.body;
        const updatedTask = await taskService.updateTaskById(id, taskData);
        sendResponse(res, {
            statusCode: 200,
            message: "Task update successfully",
            data: updatedTask,
        });
    } catch (error) {
        next(error);
        // res.status(400).json({ message: error.message });
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const task = await taskService.deleteTaskById(id);
        sendResponse(res, {
            statusCode: 200,
            message: "Task deleted successfully",
            data: task,
        });
    } catch (error) {
        next(error);
        // res.status(404).json({ message: error.message });
    }
};
