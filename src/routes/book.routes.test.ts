import request from 'supertest';
import app from '../app';
import type { BookTypes, UserTypes } from '../types';
import { sequelize } from '../config/db';
import { seed } from '../lib/seed';
import { USERNAME, PASSWORD } from '../middleware/auth.middleware';

describe('Book Routes', () => {
    beforeAll(async () => {
        await seed();
    });
    afterAll(async () => {
        await sequelize.drop();
    });

    let createdBookId: number;
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

    it('POST /book should create new book (AUTH)', async () => {
        const bookData: BookTypes = {
            title: 'The Book',
            author: 'The Author',
            year: '2000'
        };

        const response = await request(app)
            .post('/book')
            .set('Authorization', `Bearer ${token}`)
            .send(bookData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('title', 'The Book');
        createdBookId = response.body.id;
    });

    it('PUT /book/:bookId should edit a book (AUTH)', async () => {
        const response = await request(app)
            .put(`/book/${createdBookId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Updated title' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Updated title');
    });

    it('GET /book should get all books', async () => {
        const response = await request(app).get('/book');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });

    it('GET /book/:bookId should get a specific book', async () => {
        const response = await request(app).get(`/book/${createdBookId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Updated title');
    });

    it('DELETE /book/:bookId should delete a book (AUTH)', async () => {
        const response = await request(app)
            .delete(`/book/${createdBookId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);

        const book = await request(app).get('/book');

        expect(book.body).toHaveLength(0);
    });

    it('GET /book/:bookId/restore should restore a deleted book (AUTH)', async () => {
        const response = await request(app)
            .get(`/book/${createdBookId}/restore`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);

        const book = await request(app).get('/book');
        expect(book.body).toHaveLength(1);
    });
});
