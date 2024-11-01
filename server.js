import express from 'express';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import authMiddleware from './middleware/authMiddleware.js';


dotenv.config();

//Conexion a la base de datos 
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

 //Rutas de autenticacion
app.use('/api/auth', authRoutes);

//Rutas protegidas
app.use('/api/reports', authMiddleware, reportRoutes);
app.use('/api/resources', authMiddleware, resourceRoutes);



const PORT = process.env.PORT || 5000;

console.log("*******************************************************************************************************************");
console.log("Bienvenido al servidor de EduSafe\nNuestra misión es mejorar el ambiente en el que interactúan nuestros estudiantes");
console.log("*******************************************************************************************************************");
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

export default app;
