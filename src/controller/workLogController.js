import sendResponse from "../middlewares/responseFormatter.js";
import * as workLogService from '../service/worklogService.js';

export const getAllWorkLog = async (req, res, next) => {
    try {
        const workLog = await workLogService.getAllWorkLog();
        sendResponse(res, {
            statusCode: 200,
            message: 'successfully',
            data: workLog,
        })
    } catch (error) {
        next(error)        
    }
}

export const getLogById = async (req, res, next) => {
    try {
        const logId = parseInt(req.params.id)
        const worklog = await workLogService.getWorkLogByUser(logId);
        sendResponse(res, {
            statusCode: 200,
            message: 'Success',
            data: worklog
        })
    } catch (error) {
        next(error);        
    }
}

export const createWorkLog = async (req, res, next) => {
    try {
        const worklogData = req.body;
        const worklog = await workLogService.addWorkLog(worklogData);
        sendResponse(res, {
            statusCode: 201,
            message: "Working log created successfully",
            data: worklog,
        });
    } catch (error) {
        next(error)
    }
}

export const updateWorklog = async (req, res, next) => {
    try {
        const logId = parseInt(req.params.id);
        const worklogData = req.body;
        const updateLog = await workLogService.editWorkLog(logId, worklogData)
        sendResponse(res, {
            statusCode: 200,
            message: "Task update successfully",
            data: updateLog,
        });
    } catch (error) {
        next(error);
    }
}

export const deleteWorkLog = async (req, res, next) => {
    try {
        const logId = parseInt(req.params.id);
        const worklog = await workLogService.removeWorkLog(logId);
        sendResponse(res, {
            statusCode: 200,
            message: "Task deleted successfully",
            data: worklog,
        });
    } catch (error) {
        next(error)
    }
}
