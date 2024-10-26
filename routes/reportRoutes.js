import express from 'express';
import { createReport, getReports } from '../controllers/reportController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta para crear un nuevo reporte (requiere autenticación)
router.post('/', authMiddleware, createReport);

// Ruta para obtener todos los reportes (requiere autenticación)
router.get('/', authMiddleware, getReports);

export default router;
