const request = require('supertest');
const app = require('../app');
const chai = require('chai');
const expect = chai.expect;

describe('GET /members', () => {
    it('should return list of members and number of borrowed book', (done) => {
      request(app)
        .get('/members')
        .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('data').that.is.an('array');

            res.body.data.forEach(item => {
                expect(item).to.be.an('object');
                expect(item).to.have.property('id').that.is.a('number');
                expect(item).to.have.property('code').that.is.a('string');
                expect(item).to.have.property('name').that.is.a('string');
                expect(item).to.have.property('total_borrowed').that.is.a('number');
              });
            done();
        });
    });
});

describe('GET /books', () => {
    it('should return list of books', (done) => {
      request(app)
        .get('/books')
        .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('data').that.is.an('array');

            res.body.data.forEach(item => {
                expect(item).to.be.an('object');
                expect(item).to.have.property('id').that.is.a('number');
                expect(item).to.have.property('code').that.is.a('string');
                expect(item).to.have.property('title').that.is.a('string');
                expect(item).to.have.property('author').that.is.a('string');
                expect(item).to.have.property('stock').that.is.a('number');
              });
            done();
        });
    });
});

describe('POST /borrows', () => {
    it('should return 400 for request validation error', (done) => {
      request(app)
        .post('/borrows')
        .end((err, res) => {
          if (err) return done(err);
  
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('message').that.is.an('string');
          expect(res.body).to.have.property('errors').that.is.a('array');
          expect(res.body.message).to.deep.equal("Request validation error");
  
          done();
        });
    });

    it('should return 404 for member not found', (done) => {
        const payload = { member_id: 10, book_id: 1 };
        request(app)
          .post('/borrows')
          .send(payload)
          .end((err, res) => {
            if (err) return done(err);
    
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('message').that.is.an('string');
            expect(res.body.message).to.deep.equal("Member not found");
    
            done();
          });
    });

    it('should return 404 for book not found', (done) => {
        const payload = { member_id: 1, book_id: 10 };
        request(app)
          .post('/borrows')
          .send(payload)
          .end((err, res) => {
            if (err) return done(err);
    
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('message').that.is.an('string');
            expect(res.body.message).to.deep.equal("Book not found");
    
            done();
          });
    });

    it('should return 201 for success borrowed a book', (done) => {
        const payload = { member_id: 1, book_id: 1 };
        request(app)
          .post('/borrows')
          .send(payload)
          .end((err, res) => {
            if (err) return done(err);
    
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('message').that.is.an('string');
            expect(res.body.message).to.deep.equal("You have borrowed the book");
    
            done();
          });
    });
});

describe('PUT /returns', function() {
    it('should return 400 for request validation error', (done) => {
      request(app)
        .put('/returns')
        .end((err, res) => {
          if (err) return done(err);
  
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('message').that.is.an('string');
          expect(res.body).to.have.property('errors').that.is.a('array');
          expect(res.body.message).to.deep.equal("Request validation error");
  
          done();
        });
    });

    it('should return 404 for member not found', (done) => {
        const payload = { member_id: 10, book_id: 1 };
        request(app)
          .put('/returns')
          .send(payload)
          .end((err, res) => {
            if (err) return done(err);
    
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('message').that.is.an('string');
            expect(res.body.message).to.deep.equal("Member not found");
    
            done();
          });
    });

    it('should return 404 for book not found', (done) => {
        const payload = { member_id: 1, book_id: 10 };
        request(app)
          .put('/returns')
          .send(payload)
          .end((err, res) => {
            if (err) return done(err);
    
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('message').that.is.an('string');
            expect(res.body.message).to.deep.equal("Book not found");
    
            done();
          });
    });

    it('should return 200 for success returned a book', (done) => {
        const payload = { member_id: 1, book_id: 1 };
        request(app)
          .put('/returns')
          .send(payload)
          .end((err, res) => {
            if (err) return done(err);
    
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message').that.is.an('string');
            expect(res.body.message).to.deep.equal("You have returned the book");
    
            done();
          });
    });

    it('should return 400 for not borrowing the book', (done) => {
        const payload = { member_id: 1, book_id: 1 };
        request(app)
          .put('/returns')
          .send(payload)
          .end((err, res) => {
            if (err) return done(err);
    
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('message').that.is.an('string');
            expect(res.body.message).to.deep.equal("You are not borrowing this book");
    
            done();
          });
    });
});