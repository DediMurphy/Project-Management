import { createLog, deleteLog, findAllLog, findLogByUser, updateLog } from "../repository/worklogRepository";

export const getAllWorkLog = async () => {
    return await findAllLog();
}

export const getWorkLogByUser = async (logId) => {
    const log = await findLogByUser(logId);

    if (!log) {
        throw new Error('Task not found');
    }
    
    return log;
}

export const addWorkLog = async (logData) => {
    return await createLog(logData);
}

export const editWorkLog = async (logId, logData) => {
    await getWorkLogByUser(logId);
    
    return await updateLog(logId, logData);
}

export const removeWorkLog = async (logId) => {
    await getWorkLogByUser(logId);

    return await deleteLog(logId);
}



