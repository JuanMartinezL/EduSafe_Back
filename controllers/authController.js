import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User  from '../models/User.js';
import Role from '../models/Role.js';


//Registro de usuarios
export const registerUser = async (req, res) => {
  console.log(req,res);
  const { name, last_name, email, password, roleName } = req.body;


  try {
    // Verificación de la contraseña
    if (!password) {
      return res.status(400).json({ message: 'La contraseña es requerida' });
    }

    // Verificación de si el usuario ya existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'El usuario ya existe🙃' });
    }

    //Buscamos el rol en la base de datos usando el roleName proporcionado o el rol "Estudiante" por defecto
    const role = await Role.findOne({ roleName: roleName || 'Estudiante'});
    if (!role){
      return res.status(400).json({ message: 'Rol no valido 😢'}); 
    }

    // Mostramos la contraseña en la consola para verificar (solo para pruebas)
   // console.log("Password recibido:", password);

    // Hasheamos la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, last_name, email, password: hashedPassword, role_id });
    
    // Guardamos el usuario en la base de datos
    await user.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente🥳', user});
  } catch (error) {
    // Muestra el error en la consola del servidor
    console.error("Error en el registro:", error);
    res.status(500).json({ error: error.message });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).populate('roleId'); // Para traer el rol junto con el usuario
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user._id, role: user.roleId.roleName }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
