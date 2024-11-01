import express from 'express';
import { createReport, getReports } from '../controllers/reportController.js';
import authMiddleware, { authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta para crear un reporte (accesible para estudiantes)
router.post('/create', authMiddleware, authorize('create_report'), createReport);

// Ruta para visualizar reportes (requiere autenticación y permisos de admin)
router.get('/view', authMiddleware, authorize('view_reports'), getReports);

export default router;
