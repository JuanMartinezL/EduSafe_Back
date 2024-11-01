import mongoose from 'mongoose';
import Role from './models/Role.js';
import dotenv from 'dotenv';

dotenv.config();

const roles = [
  { 
    roleName: 'Estudiante', 
    permissions: ["create_report", "access_resources"]
  },
  { 
    roleName: 'Padre', 
    permissions: ["create_report", "access_resources"]
  },
  { 
    roleName: 'Profesor', 
    permissions: ["view_reports", "access_resources"]
  },
  { 
    roleName: 'Administrador', 
    permissions: ["manage_users", "view_reports", "access_resources", "create_report"]
  }
];

const seedRoles = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Elimina roles existentes 
    await Role.deleteMany();

    // Inserta roles predefinidos
    await Role.insertMany(roles);
    console.log('Roles predefinidos añadidos correctamente');
  } catch (error) {
    console.error('Error al añadir roles:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedRoles();
