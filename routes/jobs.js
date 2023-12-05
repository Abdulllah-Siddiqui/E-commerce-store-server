import express from 'express';
import { GetDashboardStats } from "../controllers/jobs";

const jobRoutes = express.Router();

jobRoutes.get('/dashboardStats', GetDashboardStats);

export default jobRoutes;
