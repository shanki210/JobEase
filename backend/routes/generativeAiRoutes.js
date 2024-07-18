import express from "express";
import { scoreApplicationsAndGenerateExcel } from "../controllers/generativeAiController.js";

const router = express.Router();

router.get("/scoreapplications",scoreApplicationsAndGenerateExcel )

export default router;