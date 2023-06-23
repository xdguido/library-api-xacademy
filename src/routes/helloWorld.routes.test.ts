// import { Router } from 'express';
// import { helloWorldController } from '../controllers';
import request from 'supertest';
import app from '../app';

describe('helloWorld routes', () => {
    it('should return "Hello World" response for GET /hello-world', async () => {
        const response = await request(app).get('/hello-world');

        expect(response.status).toBe(200);
        expect(response.text).toBe('<h1>Hello World</h1>');
    });
});
