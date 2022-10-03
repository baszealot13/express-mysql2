const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const db = require('../../models/db');

let fakeUserInsert = jest.spyOn(db, 'query')
let fakeUserSelect = jest.spyOn(db, 'query')
let fakeJwtVerify = jest.spyOn(jwt, 'verify')

describe('POST /api/users', () => {
    describe('Can insert', () => {
        beforeAll(() => {
            fakeUserInsert.mockResolvedValueOnce({
                insertId: 10
            })
        })
        afterAll(() => {
            fakeUserInsert.mockReset()
        })
        test('should response with a status 201', async () => {
            const response = await request(app).post('/api/users')
                .send({
                    username: 'utest1',
                    user_email: 'utest1@gmail.com',
                    password: '1234'
                });

            expect(fakeUserInsert).toHaveBeenCalled();
            expect(response.status).toBe(201);
        });
    });

    describe('Cannot insert', () => {
        beforeAll(() => {
            fakeUserInsert
                .mockRejectedValueOnce('Duplicate user')
        })
        afterAll(() => {
            fakeUserInsert.mockReset()
        })
        test('should not response with a status 201', async () => {
            const response = await request(app).post('/api/users')
                .send({
                    username: 'utest1',
                    user_email: 'utest1@gmail.com',
                    password: '1234'
                });

            expect(fakeUserInsert).toHaveBeenCalled();
            expect(response.status).not.toBe(201);
        });
    });
});

describe('GET /api/users', () => {
    describe('Success case', () => {
        beforeAll(() => {
            fakeJwtVerify.mockReturnValueOnce({ id: 1 })
            fakeUserSelect.mockResolvedValueOnce([
                {
                    id: 1, username: 'utest1', user_emai: 'utest1@gmail.com'
                }, {
                    id: 2, username: 'utest2', user_emai: 'utest2@gmail.com'
                }, {
                    id: 3, username: 'utest3', user_emai: 'utest3@gmail.com'
                }
            ])
        })

        afterAll(() => {
            fakeJwtVerify.mockReset()
            fakeUserSelect.mockReset()
        })

        test('should resposne with a status 200', async () => {
            const response = await request(app).get('/api/users')
                .auth('abcABCDEF12345679', { type: 'bearer' });

            expect(fakeJwtVerify).toHaveBeenCalled();
            expect(fakeUserSelect).toHaveBeenCalled();
            expect(response.status).toBe(200);
        })
    });

    describe('Failes case', () => {
        beforeAll(() => {
            fakeJwtVerify.mockReturnValueOnce({ id: 1 })
            fakeUserSelect.mockRejectedValueOnce('Connection timeout')
        })

        afterAll(() => {
            fakeJwtVerify.mockReset()
            fakeUserSelect.mockReset()
        })

        test('should not resposne with a status 200', async () => {
            const response = await request(app).get('/api/users')
                .auth('abcABCDEF12345679', { type: 'bearer' });

            expect(fakeJwtVerify).toHaveBeenCalled();
            expect(fakeUserSelect).toHaveBeenCalled();
            expect(response.status).not.toBe(200);
        })
    });
});