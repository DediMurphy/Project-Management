import prisma from "../db/index.js";
import sendResponse from "../middlewares/responseFormatter.js";

export const checkIn = async (req, res, next) => {
    try {
        const userId = req.user.user_id
        const now = new Date();
        const today = new Date(now.toDateString());

        const existing = await prisma.attendance.findFirst({
            where: {
                userId,
                date: today,
            }
        })

        if (existing) {
            return res.status(400).json({message: "Already checked in today."});
        }

        const meta = await prisma.metaAttendance.findFirst();

        const status = now > new Date(`${today.toDateString()} ${meta.startTime.toTimeString()}`) 
        ? "Late" 
        : "Present";

        const attendance = await prisma.attendance.create({
            data : {
                userId,
                checkIn: now,
                date: today,
                metaId: meta.meta_id,
                status,
            },
        })

        sendResponse(res, {
            statusCode: 200,
            message: "Absensi successfully",
            data: attendance,
        })   
    } catch (error) {
        next();
    }
}

export const checkOut = async (req, res, next) => {
    try {
        const userId = req.user.user_id
        const today = new Date(now.toDateString());

        const attendance = await prisma.attendance.findFirst({
            where : {
                userId, date: today
            }
        });

        if (!attendance) return res.status(404).json({ message: "No check-in found." });
        const updated = await prisma.attendance.update({
            where: {
                attendance_id: attendance.attendance_id
            },
            data: {checkOut: new Date()}
        })
        sendResponse({
            statusCode: 200,
            message: "Absensi successfully",
            data: updated,
        })
    } catch (error) {
        next(error);
    }
}


export const requestLeave= async (req,res,next) => {
    try {
        const { type, startDate, endDate, reason,status } = req.body;
        const userId = req.user.user_id;

        const leave = await prisma.leaveRequest.create({
            data: {
                userId,
                type,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                reason,
                status: status
            }
        })

        sendResponse({
            statusCode: 201,
            message: "Request",
            data: leave
        })
    } catch (err) {
        next(err);
    }
}

export const recapAttendance = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.userId);
        const { month } = req.query;
    
        const start = new Date(`${month}-01T00:00:00Z`);
        const end = new Date(new Date(start).setMonth(start.getMonth() + 1));
        
        const data = await prisma.attendance.findMany({
            where: {
                userId,
                date: {gte: start, lt: end},
            }
        })

        const total = data.length;
        const late = data.filter(a => a.status === 'Late').length;
        const absent = data.filter(a => a.status === 'Absent').length;
        
        res.json({ total, late, absent, data });
    } catch (error) {
        next(error);
    }
}