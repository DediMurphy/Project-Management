import { createLog, deleteLog, findAllLog, findLogByUser, updateLog, getWorklogByDate } from "../repository/worklogRepository.js";
import { formatDateToYYYYMMDD } from "../utils/fromaterDate.js";

export const getAllWorkLog = async () => {
  const logs = await findAllLog();
  return logs.map((log) => ({
    ...log,
    date: formatDateToYYYYMMDD(log.date),
  }));
};
export const getWorkLogByUser = async (logId) => {
  const log = await findLogByUser(logId);
  if (log) {
    return {
      ...log,
      date: formatDateToYYYYMMDD(log.date)
    };
  }
  return log;
};


export const addWorkLog = async (logData) => {
    return await createLog(logData);
}

export const editWorkLog = async (logId, logData) => {
    await getWorkLogByUser(logId);
    
    return await updateLog(logId, logData);
}

export const removeWorkLog = async (logId) => {
    await getWorkLogByUser(logId);
    const worklog = await deleteLog(logId);
    if (!worklog) {
        throw new Error('Task not found');
    }
    return worklog
}

export const getWorkByDate = async (date) => {
  const logs = await getWorklogByDate(date);
  return logs;
};


