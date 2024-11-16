
import Role from '../models/Role.js';

const checkPermissions = (requiredPermissions) => async (req, res, next) => {
  try {
    const { role } = req.user;
    console.log('Rol del usuario:', role); // Verificar rol actual del usuario

    // Buscar el rol en la base de datos con permisos
    const userRole = await Role.findOne({ roleName: role }).populate('permissions');
    if (!userRole) {
      console.error('Rol no encontrado en la base de datos');
      return res.status(403).json({ message: 'Rol no encontrado.' });
    }

    // Si `permissions` es un arreglo de objetos, obtén solo los nombres
    const userPermissions = userRole.permissions.map(perm => 
      typeof perm === 'string' ? perm : perm.permissionName
    );

    console.log('Permisos del rol:', userPermissions); // Verifica los permisos del rol

    // Verificar si el rol tiene los permisos necesarios
    const hasPermission = requiredPermissions.every(permission =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      console.warn(`Rol ${role} no tiene permisos suficientes para ${requiredPermissions}`);
      return res.status(403).json({ message: 'No tienes permisos suficientes para realizar esta acción.' });
    }

    console.log('Permisos verificados correctamente');
    next();
  } catch (error) {
    console.error('Error en el middleware de permisos:', error);
    res.status(500).json({ message: 'Error de servidor.' });
  }
};

export default checkPermissions;
