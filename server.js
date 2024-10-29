import express from 'express';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

//CONEXION DE LA BASE DE DATOS 
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/resources', resourceRoutes);

const PORT = process.env.PORT || 5000;

console.log("*******************************************************************************************************************");
console.log("Bienvenido al servidor de EduSafe\nNuestra mision es mejorar el ambiente en el que interactuan nuestros estudiantes");
console.log("*******************************************************************************************************************");
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

export default app;
