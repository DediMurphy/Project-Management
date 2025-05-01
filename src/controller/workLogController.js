import { sendResponse } from "../middlewares/responseFormatter";
import * as workLogService from '../service/worklogService';

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