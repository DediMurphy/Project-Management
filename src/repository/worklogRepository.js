import prisma from "../db/index.js";

export const findAllLog = async () => {
    return await prisma.workLog.findMany();
}

export const findLogByUser = async (logId) => {
    return await prisma.workLog.findUnique({
        where: {
            worklog_id: logId
        }
    })
}

export const createLog = async (newLog) => {
    return await prisma.workLog.create({
        data: {
            title: newLog.title,
            description: newLog.description,
            startDate: newLog.startDate,
            endDate: newLog.endDate,
            status: newLog.status,
            date: newLog.date,
            comment: newLog.comment,
            userId: newLog.userId
        }
    })
}

export const updateLog = async (logId, updateLog) => {
    return await prisma.workLog.update({
        where: {
            worklog_id: logId,
        },
        data: {
            title: updateLog.title,
            description: updateLog.description,
            startDate: updateLog.startDate,
            endDate: updateLog.endDate,
            status: updateLog.status,
            date: updateLog.date,
            comment: updateLog.comment,
        }
    })
}

export const deleteLog = async (logId) => {
    return await prisma.workLog.delete({
       where: {
            worklog_id: logId
       }
    });
}