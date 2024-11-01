import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import authMiddleware, { authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para acceder a recursos (con restricciones según el rol)
router.get('/', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(200).json({ message: 'Acceso a los recursos permitido' });
  } else {
    return res.status(403).json({ error: 'No tienes permiso para acceder a estos recursos' });
  }
});

// Ruta protegida de ejemplo (perfil del usuario)
router.get('/profile', authMiddleware, authorize(['Estudiante', 'Profesor', 'Administrador']), (req, res) => {
  res.json({ message: `Bienvenido, ${req.user.role}. Esta es tu información de perfil.` });
});

export default router;
