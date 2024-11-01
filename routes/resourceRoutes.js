import express from 'express';
import { getResources, createResource } from '../controllers/resourceController.js';
import authMiddleware, { authorize } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Ruta para acceder a recursos (con restricciones según el rol)
router.get('/', authMiddleware, authorize('access_resources'), getResources);

// Ruta para crear un recurso educativo (accesible para usuarios autenticados)
router.post('/create', authMiddleware, authorize('access_resources'), upload.single('file'), createResource);

export default router;
