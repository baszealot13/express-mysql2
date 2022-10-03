const request = require('supertest');
const bcrypt = require('bcrypt');

const app = require('../../app');
const db = require('../../models/db');

let fakeUserSelect = jest.spyOn(db, 'query');
let fakeCompareSync = jest.spyOn(bcrypt, 'compareSync');

describe('POST /api/login', () => {
    describe('Authenticate success', () => {
        beforeAll(() => {
            fakeUserSelect.mockResolvedValueOnce([{
                id: 1,
                username: 'utest1',
                user_email: 'utest1@gmail.com',
                password: 'a1b2c3d4e5'
            }])
            fakeCompareSync.mockReturnValueOnce(true)
        })

        afterAll(() => {
            fakeUserSelect.mockReset()
            fakeCompareSync.mockReset()
        })

        test('should resposne with a status 200', async () => {
            const response = await request(app).post('/api/login')
                .send({
                    user_email: 'utest1@gmail.com',
                    password: '1234'
                })
            
            expect(fakeUserSelect).toHaveBeenCalled();
            expect(fakeCompareSync).toHaveBeenCalled();
            expect(response.status).toBe(200);
        });
    });

    describe('Unauthenticate', () => {
        describe('User no found', () => {
            beforeAll(() => {
                fakeUserSelect.mockResolvedValueOnce([])
            })

            afterAll(() => {
                fakeUserSelect.mockReset()
            })

            test('should resposne with a status 401', async () => {
                const response = await request(app).post('/api/login')
                    .send({
                        user_email: 'utest1@gmail.com',
                        password: '1234'
                    })

                expect(fakeUserSelect).toHaveBeenCalled();
                expect(fakeCompareSync).not.toHaveBeenCalled();
                expect(response.status).toBe(401);
            });
        });
        
        describe('Incorrect user password', () => {
            beforeAll(() => {
                fakeUserSelect.mockResolvedValueOnce([{
                    id: 1,
                    username: 'utest1',
                    user_email: 'utest1@gmail.com',
                    password: 'a1b2c3d4e5'
                }])
                fakeCompareSync.mockReturnValueOnce(false)
            })

            afterAll(() => {
                fakeUserSelect.mockReset()
                fakeCompareSync.mockReset()
            })

            test('should resposne with a status 401', async () => {
                const response = await request(app).post('/api/login')
                    .send({
                        user_email: 'utest1@gmail.com',
                        password: '0000'
                    })

                expect(fakeUserSelect).toHaveBeenCalled();
                expect(fakeCompareSync).toHaveBeenCalled();
                expect(response.status).toBe(401);
            });
        });
    });
});