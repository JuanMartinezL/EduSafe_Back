import express from 'express';
import { createReport, getReports } from '../controllers/reportController.js';
import authMiddleware, { authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta para visualizar reportes (requiere autenticación y permisos de admin)
router.get('/view', authMiddleware, authorize('admin'), getReports);

// Ruta para crear un reporte (accesible para estudiantes)
router.post('/create', authMiddleware, authorize('student'), createReport);

export default router;
