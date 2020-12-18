process.env.NODE_ENV = 'test';

// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

// Database Connection Pool
const { pool } = require('../db')

chai.use(chaiHttp)
/* 
    Sets up tests for the users endpoint 
    We are using Chai to setup and run unit tests
    A test has a description (describe()) what it
    does (it()) and then the actual execution.
*/
describe('User Tests', () => {
    beforeEach((done) => {
        // Before each test, completely clear the users table
        const query = `DELETE FROM users`;
        pool.query(query, (err, res) => {
            done();
        });
    });

    /* 
        Testing POST for users
        Tries to add a new user to the database
    */
    describe('/POST Register', () => {
        it('should add new user to table', (done) => {
            chai.request(pool)
                .post('/users') // actual endpoints
                .send({ // body data
                    username: 'name',
                    email: 'email@gmail.com',
                    password: 'pass123'
                })
                .end((err, res) => { // on receive
                    res.should.have.status(200); // should be successful status
                    res.body.length.should.be.eql(1);  // should return a single result
                    done();
                });
        });
    });

    /* 
        Testing GET for users
        Checks if a non-existing user exists in the table
    */
    describe('/GET Login', () => {
        it('should check if user exists in table', (done) => {
            chai.request(pool)
                .get('/users')
                .send({
                    username: 'name',
                    password: 'pass123456'
                })
                .end((err, res) => {
                    res.should.have.status(400); // should be unsuccessful
                    res.body.length.should.be.eql(0); // nothing is returned
                    done();
                });
        });
    });

    /*
        Testing DELETE for users
        Checks if a request to remove a non-exisisting user is made
    */
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