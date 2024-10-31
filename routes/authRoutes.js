import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import  authMiddleware, {authorize} from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta para registrar un nuevo usuario
// Esta ruta permite a los usuarios registrarse con un rol asignado.

// Ruta para acceder a recursos (con restricciones según el rol)
router.get('/', (req, res) => {
  const hasPermission = req.user && req.user.role !== 'admin';  // Asumiendo que los recursos están restringidos para 'admin'

  if (hasPermission) {
      res.status(200).json({ message: 'Acceso a los recursos permitido' });
  } else {
      res.status(403).json({ error: 'No tienes permiso para acceder a estos recursos' });
  }
});

router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta protegida de ejemplo (perfil del usuario)
// Esta ruta solo es accesible para usuarios autenticados con roles específicos (Estudiante, Profesor, Administrador).
router.get('/profile', authMiddleware, authorize(['Estudiante', 'Profesor', 'Administrador']), (req, res) => {
    res.json({ message: `Bienvenido, ${req.user.role}. Esta es tu información de perfil.` });

});

export default router;
