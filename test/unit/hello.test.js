const app = require('../../app');
const request = require('supertest');

describe('GET /api/hello', () => {
    test('should response with a status 200', async () => {
        const response = await request(app).get('/api/hello');

        expect(response.status).toBe(200);
        expect(JSON.parse(response.text).message).toBeDefined();
        expect(JSON.parse(response.text).message).toBe('Hello world');
    });
});