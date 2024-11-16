import express from 'express';
import { getResources, createResource } from '../controllers/resourceController.js';
import authMiddleware, { authorize } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import checkPermissions from '../middleware/permissionMiddleware.js';

const router = express.Router();

// Ruta para acceder a recursos (con restricciones según el rol)
router.get('/',
  authMiddleware,                          // Verifica el token de autenticación
  authorize(['Administrador', 'Profesor', 'Estudiante']),        // Autoriza solo ciertos roles
  checkPermissions(['access_resources']),   // Verifica permisos específicos
  getResources
);

// Ruta para crear un recurso educativo
router.post(
  '/create',
  authMiddleware, // Verifica el token de autenticación
  authorize(['Administrador', 'Profesor']), // Autoriza solo ciertos roles
  checkPermissions(['create_resources']), // Verifica el permiso específico para crear
  upload.single('file'), // Middleware de subida de archivos
  createResource // Controlador para la creación del recurso
);
export default router; 
