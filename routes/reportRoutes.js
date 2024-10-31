import express from 'express'

const router = express.Router()

// Ruta para visualizar reportes (requiere autenticación y permisos de admin)
router.get('/view', (req, res) => {
    // Lógica para verificar si el usuario tiene permisos de admin
    const isAdmin = req.user && req.user.role === 'admin';  // Asumiendo que el usuario está en req.user

    if (isAdmin) {
        res.status(200).json({ message: 'Reportes visibles para el admin' });
    } else {
        res.status(403).json({ error: 'No tienes permiso para ver reportes' });
    } 
});

// Ruta para crear un reporte (accesible para estudiantes)
router.post('/create', (req, res) => {
    // Lógica para crear un reporte
    const isStudent = req.user && req.user.role === 'student';  // Asumiendo que el usuario está en req.user

    if (isStudent) {
        res.status(200).json({ message: 'Reporte creado exitosamente' });
    } else {
        res.status(403).json({ error: 'No tienes permiso para crear reportes' });
    }
});

export default router;