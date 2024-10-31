import Role from '../models/Role.js';

const checkPermissions = (requiredPermissions) => async (req, res, next) => {
    try {
        const { role } = req.user;

        // Busca el rol en la base de datos
        const userRole = await Role.findOne({ roleName: role });
        if (!userRole) {
            return res.status(403).json({ message: 'Rol no encontrado.' });
        }

        // Verifica si el rol del usuario tiene los permisos necesarios
        const hasPermission = requiredPermissions.every(permission => 
            userRole.permissions.includes(permission)
        );

        if (!hasPermission) {
            return res.status(403).json({ message: 'No tienes permisos suficientes para realizar esta acción.' });
        }

        next();
    } catch (error) {
        console.error('Error en el middleware de permisos:', error);
        res.status(500).json({ message: 'Error de servidor.' });
    }
};

export default checkPermissions;
