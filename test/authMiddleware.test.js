import request  from 'supertest';
import app  from '../server.js';  //  archivo principal de Express
import mongoose  from 'mongoose';
import User  from '../models/User.js';
import Role  from '../models/Role.js';

describe('Middleware de autorización', () => {
    let server;
    let adminRole, studentRole, adminUser, studentUser;

    beforeEach(async () => {
        await Role.deleteMany({}); // Limpia la colección de roles antes de cada prueba
      });

    beforeAll(async () => {
        server = app.listen(3000);

        // Crear roles
        adminRole = await Role.create({ roleName: 'Administrador', permissions: ['view_reports', 'manage_users'] });
        studentRole = await Role.create({ roleName: 'Estudiante', permissions: ['create_report',  'access_resources'] });
 
        // Crear usuarios
        adminUser = await User.create({ name: 'Admin', last_name: 'Admin', email: 'admin@test.com', password: '123456', roleId: adminRole._id });
        studentUser = await User.create({ name: 'Student', last_name: 'one', email: 'student@test.com', password: '123456', roleId: studentRole._id });
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Role.deleteMany({});
        mongoose.connection.close();
        server.close();
    });

    test('Admin debe poder ver reportes', async () => {
        const res = await request(app)
            .get('/reports/view')
            .set('Authorization', `Bearer ${adminUser._id}`);
        expect(res.statusCode).toBe(200);
    });

    test('Estudiante no debe poder ver reportes', async () => {
        const res = await request(app)
            .get('/reports/view')
            .set('Authorization', `Bearer ${studentUser._id}`);
        expect(res.statusCode).toBe(403);
    });

    test('Estudiante debe poder crear reporte', async () => {
        const res = await request(app)
            .post('/reports/create')
            .set('Authorization', `Bearer ${studentUser._id}`);
        expect(res.statusCode).toBe(200);
    });

    test('Admin no debe poder acceder a recursos sin permiso', async () => {
        const res = await request(app)
            .get('/resources')
            .set('Authorization', `Bearer ${adminUser._id}`);
        expect(res.statusCode).toBe(403);
    });
});
