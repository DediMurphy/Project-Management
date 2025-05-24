import prisma from "../db/index.js";

export const findAllLog = async () => {
  return await prisma.workLog.findMany();
};

export const findLogByUser = async (logId) => {
  return await prisma.workLog.findUnique({
    where: {
      worklog_id: logId,
    },
  });
};

export const createLog = async (newLog) => {
  return await prisma.workLog.create({
    data: {
      title: newLog.title,
      description: newLog.description,
      startTime: newLog.startTime,
      endTime: newLog.endTime,
      status: newLog.status,
      date: newLog.date,
      comment: newLog.comment,
      userId: newLog.userId,
    },
  });
};

export const updateLog = async (logId, updateLog) => {
  return await prisma.workLog.update({
    where: {
      worklog_id: logId,
    },
    data: {
      title: updateLog.title,
      description: updateLog.description,
      startTime: updateLog.startTime,
      endTime: updateLog.endTime,
      status: updateLog.status,
      date: updateLog.date,
      comment: updateLog.comment,
    },
  });
};

export const deleteLog = async (logId) => {
  return await prisma.workLog.delete({
    where: {
      worklog_id: logId,
    },
  });
};

export const getWorklogByDate = async (date) => {
  if (!date || typeof date !== 'string' || isNaN(Date.parse(date))) {
    console.error("❌ Invalid input date:", date);
    throw new Error("Invalid date input");
  }

  const parsedDate = new Date(`${date}T00:00:00`);
  console.log("✅ Final parsed Date for Prisma:", parsedDate);

  return await prisma.workLog.findMany({
    where: {
      date: {
        equals: parsedDate,
      },
    },
    orderBy: {
      startTime: "asc",
    },
  });
};

