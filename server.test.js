const supertest = require('supertest');
const server = require('./server');
const db = require('./data/dbConnector');

//afterEach(async ()=>{
//    await db('games').truncate();
//})

describe('server', () => {
    it('can run test',()=>{
        expect(true).toBeTruthy();
    })

    describe('GET /',()=>{
        it('should return http status code 200',()=>{
            return supertest(server)
                .get('/').then(response=>{
                    expect(response.status).toBe(200);
                })
        })

        it('should return {api: "Up"',()=>{
            return supertest(server)
                .get('/').then(response=>{
                    expect(response.body).toEqual({api:'Up'});
                    expect(response.body.api).toBeDefined();
                    expect(response.body.api).toBe('Up');
                })
        })
    })

    describe('GET /games',()=>{
        it('should return http status code 200',()=>{
            return supertest(server)
            .get('/games').then(response=>{
                expect(response.status).toBe(200);
            })
        })

        it('should return an array',()=>{
            return supertest(server)
            .get('/games').then(response=>{
                expect(Array.isArray(response.body)).toBe(true);
            })
        })
    })

    describe('POST /games',()=>{
        it('should return http status code 201',()=>{
            return supertest(server)
            .post('/games').send({name: "Wizard"}).then(response=>{
                expect(response.status).toBe(201);
            })
        })

        it('should return http status code 400 if there is no name',()=>{
            return supertest(server)
            .post('/games').send({names: "Wizard"}).then(response=>{
                expect(response.status).toBe(400);
                expect(response.body).toEqual({message: 'Please provide a name for the game'});
            })
        })
    })

    describe('DELETE /games/:id',()=>{
        it('should return htttp status code 200 on success delete',()=>{
            return supertest(server)
            .delete('/games/2').then(response=>{
                expect(response.status).toBe(200);
            })
        })

        it('should return {removed: 1',()=>{
            return supertest(server)
            .delete('/games/1').then(response=>{
                expect(response.body).toEqual({removed: 1});
            })
        })
    })
})