import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Role from '../models/Role.js';

// Middleware para verificar el token de autenticación
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No hay token, autorización denegada❌' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'El token no es válido😒' });
  }
};

// Middleware para verificar permisos específicos según el rol del usuario
export const authorize = (requiredPermission) => async (req, res, next) => {
  try {
    // Buscar el usuario con el rol y sus permisos
    const user = await User.findById(req.user.id).populate('roleId');
    const userRole = await Role.findById(user.roleId);

    if (userRole.permissions.includes(requiredPermission)) {
      next();  // Tiene permiso, continúa
    } else {
      res.status(403).json({ message: 'No tienes permiso para realizar esta acción.' });
    }
  } catch (error) {
    console.error('Error de autorización:', error);
    res.status(500).json({ message: 'Error de autorización' });
  }
};


export default authMiddleware;
