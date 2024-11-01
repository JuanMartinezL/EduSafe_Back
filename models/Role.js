import mongoose from 'mongoose';

const rolesSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: {
    type: [String], // Listado de permisos específicos
    required: true,
  },
});

const Role = mongoose.model('Role', rolesSchema);

export default Role;
