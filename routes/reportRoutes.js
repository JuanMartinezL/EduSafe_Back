import express from 'express';
import { 
  createReport, 
  getReports, 
  getAllReports, 
  getReportById, 
  updateReportStatus 
} from '../controllers/reportController.js';
import authMiddleware, { authorize } from '../middleware/authMiddleware.js';
import Report from '../models/Report.js';

const router = express.Router();

// Ruta para crear un reporte (accesible para Estudiante)
router.post('/', authMiddleware, authorize(['Estudiante']), createReport);

// Ruta para visualizar todos los reportes (requiere autenticación)
router.get('/view', authMiddleware, authorize(['Administrador','Profesor', 'Estudiante']), getAllReports);

// Ruta para visualizar reportes específicos para el usuario
router.get('/my-reports', authMiddleware, authorize(['Estudiante', 'Profesor', ]), getReports); 


// Ruta para obtener un reporte específico por su ID
router.get('/:id', authMiddleware, authorize(['Estudiante', 'Profesor', 'Administrador']), getReportById);

// Ruta para actualizar el estado de un reporte
router.put('/:id', authMiddleware, authorize(['Estudiante', 'Profesor', 'Administrador']), updateReportStatus);

export default router;
