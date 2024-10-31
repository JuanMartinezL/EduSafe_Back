import express from 'express';
const router = express.Router();

// Ruta para acceder a recursos (con restricciones según el rol)
router.get('/', (req, res) => {
    const hasPermission = req.user && req.user.role !== 'admin';  // Asumiendo que los recursos están restringidos para 'admin'

    if (hasPermission) {
        res.status(200).json({ message: 'Acceso a los recursos permitido' });
    } else {
        res.status(403).json({ error: 'No tienes permiso para acceder a estos recursos' });
    }
});

export default router;
