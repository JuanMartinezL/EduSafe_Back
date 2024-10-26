import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User  from '../models/User.js';

export const registerUser = async (req, res) => {
  const { name, last_name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'El usuario ya existe🙃' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, last_name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente🥳' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
