import express from 'express';
import { getResources, createResource } from '../controllers/resourceController.js';
import authMiddleware, { authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta para acceder a recursos (con restricciones según el rol)
router.get('/', authMiddleware, authorize('user'), getResources);

// Ruta para crear un recurso educativo (accesible para usuarios autenticados)
router.post('/create', authMiddleware, authorize('user'), createResource);

export default router;
