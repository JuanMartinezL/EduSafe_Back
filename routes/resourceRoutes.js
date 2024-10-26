import express from 'express';
import { getResources, createResource } from '../controllers/resourceController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta para obtener todos los recursos educativos (requiere autenticación)
router.get('/', authMiddleware, getResources);

// Ruta para crear un nuevo recurso educativo (requiere autenticación)
router.post('/', authMiddleware, createResource);

export default router;
