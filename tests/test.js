const chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect;

chai.use(chaiHttp);

const server = require('../app/server');
const verify = require('../app/middlewares/verify');

// Test validateur Joi
const validateBody = require('../app/services/validator');
const schema = require ('../app/schemas/user');

const wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZvb0BiYXIuY29tIiiaWF0IjoxNjE1NzM3ODk4LCJleHAiOjE2MTU4MjQyOTh9.nY91lHkLV3zbQ1hOpbQfQfjWwLtcUOZV_hbEP6x81aM';

// Put your created token here
const rightToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNAYi5mciIsImlhdCI6MTYxNTg5OTE1OSwiZXhwIjoxNjE1OTg1NTU5fQ.qJ6INXo3SoGSq6iQr5l_2JCaNYLeqlaOAQOYkjE3rWE';

describe('Tictactrip App Tests', function() {
    describe('Validator Service', function() {    
        describe('validateBody()', function() {
            it('should return a middleware', function() {
                expect(validateBody(schema)).to.be.a('function');
            });
    
            it('should invalidate incorrect data in the body', function(done) {
                chai.request(server)
                .post('/api/token')
                .type('json')
                .send({
                    email: 'k@b.c'
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.a('string');
                    done();
                });
            });
        });
    });

    describe('Token and account creation', function() {
        it('should return status 400 and error message if no email', function(done) {
            chai.request(server)
            .post('/api/token')
            .type('json')
            .end((err,res) => {
                expect(res).to.have.status(400);
                expect(res.error.text).to.be.a('string');
                done();
            });
        });

        it('should return status 200 and and new user in response', function(done) {
            chai.request(server)
            .post('/api/token')
            .type('json')
            .send({ email: 'best@best.com'})
            .end((err,res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
        });

        it('should return status 200 and success message can log in', function(done) {
            chai.request(server)
            .post('/api/token')
            .type('json')
            .send({ email: 'foo@bar.com'})
            .end((err,res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.be.a('string');
                done();
            });
        });
    });

    describe('Check token', function() {
        it('should return status 401 and error message if wrong token', function(done) {
            chai.request(server)
            .post('/api/justify')
            .set('authorization', wrongToken)
            .send('Etiam posuere quam ac quam.')
            .end((err,res) => {
                expect(res).to.have.status(401);
                expect(res.body.message).to.be.a('string');
                done();
            });
        });

        it('should return status 401 and error message if no token provided', function(done) {
            chai.request(server)
            .post('/api/justify')
            .end((err,res) => {
                expect(res).to.be.a('object');
                done();
            });
        });
        
        // Test with right token
        let mockReq = {
            headers:{} // your JWT here
        }

        let mockRes = {};

        let nextCalled = false;
        let next = function(){nextCalled = true}

        it('should return true if next() is called', function(done) {
            mockReq.headers['authorization'] = rightToken;
            verify(mockReq, mockRes, next);
            expect(nextCalled).to.be.true;
            done();
        });
    });

    describe('Justify Content', function() {
        it('should return status 200 and success message', function(done) {
            chai.request(server)
            .post('/api/justify')
            .set('authorization', rightToken)
            .send('Dolor ex ea reprehenderit proident ut ut.')
            .end((err,res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.be.a('string');
            });
            done();
        });
    });
});