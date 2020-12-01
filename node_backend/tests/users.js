process.env.NODE_ENV = 'test';

// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

// Database
const { pool } = require('../db')

chai.use(chaiHttp)
describe('User Tests', () => {
    beforeEach((done) => {
        const query = `DELETE FROM users`;
        pool.query(query, (err, res) => {
            done();
        });
    });

    describe('/POST Register', () => {
        it('should add new user to table', (done) => {
            chai.request(pool)
                .post('/users')
                .send({
                    username: 'name',
                    email: 'email@gmail.com',
                    password: 'pass123'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });

    describe('/GET Login', () => {
        it('should check if user exists in table', (done) => {
            chai.request(pool)
                .get('/users')
                .send({
                    username: 'name',
                    password: 'pass123456'
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/DELETE Remove', () => {
        it('should remove a user if they exist in table', (done) => {
            chai.request(pool)
                .delete('/users')
                .send({
                    username: 'name',
                    password: 'pass123'
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
});