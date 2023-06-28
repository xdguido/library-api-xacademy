import request from 'supertest';
import app from '../app';
import type { LibraryTypes, UserTypes } from '../types';
import { sequelize } from '../config/db';
import { seed } from '../lib/seed';
import { USERNAME, PASSWORD } from '../middleware/auth.middleware';

describe('Library Routes', () => {
    beforeAll(async () => {
        await seed();
    });
    afterAll(async () => {
        await sequelize.sync({ force: true });
    });

    let createdLibraryId: number;
    let token: string;

    it('POST /user should login and return token', async () => {
        const userData: UserTypes = {
            username: USERNAME,
            password: PASSWORD
        };

        const response = await request(app).post('/user').send(userData);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        token = response.body.token;
    });

    it('POST /library should create a library (AUTH)', async () => {
        const libraryData: LibraryTypes = {
            name: 'Test Library',
            location: 'Test Location',
            phone: '123-123-123'
        };

        const response = await request(app)
            .post('/library')
            .set('Authorization', `Bearer ${token}`)
            .send(libraryData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', 'Test Library');
        createdLibraryId = response.body.id;
    });

    it('PUT /library/:libId should edit a library (AUTH)', async () => {
        const response = await request(app)
            .put(`/library/${createdLibraryId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Updated Library' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Updated Library');
    });

    it('POST /library/:libId/books should create a book within a library (AUTH)', async () => {
        const response = await request(app)
            .post(`/library/${createdLibraryId}/books`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test Book', author: 'Test Author', year: '2023' });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('libId');

        const library = await request(app).get(`/library/${createdLibraryId}`);

        expect(library.body.Books).toHaveLength(1);
    });

    it('GET /library should get all libraries, including Books', async () => {
        const response = await request(app).get('/library');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });

    it('GET /library/:libId should get a specific library, including Books', async () => {
        const response = await request(app).get(`/library/${createdLibraryId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Updated Library');
    });

    it('DELETE /library/:libId should delete a library (AUTH)', async () => {
        const response = await request(app)
            .delete(`/library/${createdLibraryId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);

        const library = await request(app).get('/library');

        expect(library.body).toHaveLength(0);
    });
});
