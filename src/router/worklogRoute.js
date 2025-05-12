import express from "express";
import { createWorkLog, deleteWorkLog, getAllWorkLog, getLogById, updateWorklog } from "../controller/workLogController.js";

const router = express.Router();

router.get('/', getAllWorkLog);
router.get('/:id', getLogById)
router.post('/', createWorkLog);
router.put('/:id', updateWorklog);
router.delete('/:id', deleteWorkLog);

export default router;