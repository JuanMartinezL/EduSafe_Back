import express from 'express';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/resources', resourceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
