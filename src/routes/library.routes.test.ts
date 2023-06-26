import request from 'supertest';
import app from '../app';
import type { LibraryTypes } from '../types';
import { sequelize } from '../config/db';

describe('Library Routes', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });
    afterAll(async () => {
        await sequelize.sync({ force: true });
    });

    let createdLibraryId: number;

    it('POST /library should create a library', async () => {
        const libraryData: LibraryTypes = {
            name: 'Test Library',
            location: 'Test Location',
            phone: '123-123-123'
        };

        const response = await request(app).post('/library').send(libraryData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', 'Test Library');
        createdLibraryId = response.body.id;
    });

    it('PUT /library/:libId should edit a library', async () => {
        const response = await request(app)
            .put(`/library/${createdLibraryId}`)
            .send({ name: 'Updated Library' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Updated Library');
    });

    it('POST /library/:libId/books should create a book within a library ', async () => {
        const response = await request(app)
            .post(`/library/${createdLibraryId}/books`)
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

    it('DELETE /library/:libId should delete a library', async () => {
        const response = await request(app).delete(`/library/${createdLibraryId}`);

        expect(response.status).toBe(204);

        const library = await request(app).get('/library');

        expect(library.body).toHaveLength(0);
    });
});
