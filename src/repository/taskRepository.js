import prisma from "../db/index.js";

export const findTask = async () => {
    return await prisma.task.findMany();
};

export const findTaskById = async (taskId) => {
    return await prisma.task.findUnique({
        where: {
            task_id: taskId,
        }
    });
};

export const createTask = async (newTask) => {
    return await prisma.task.create({
      data: {
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        assigneeId: newTask.assigneeId, 
        image: newTask.image,
        priority: newTask.priority,
        datetime: newTask.datetime ? new Date(newTask.datetime) : new Date(),
        createdBy: newTask.createdBy,
        updateBy: newTask.updateBy,
        projectId: newTask.projectId,
      }
    });
  };

export const updateTask = async (taskId, updatedTask) => {
    return await prisma.task.update({
        where: {task_id: taskId,},
        data: {
            title: updatedTask.title,
            description: updatedTask.description,
            status: updatedTask.status,
            image: updatedTask.image,
            priority: updatedTask.priority,            
        }
    });
};

export const deleteTask = async (taskId) => {
    return await prisma.task.delete({
        where: {
            task_id: taskId,
        }
    });
};

export const findTasksByProjectId = async (projectId) => {
  return await prisma.task.findMany({
    where: {
      projectId: projectId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
