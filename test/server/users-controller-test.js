var expect  = require('chai').expect;
var request = require('request');

it('User Page GET', function(done) {
  request.get('http://localhost:3000/users', function(error, response, body) {
    expect(body).to.equal('responding to a GET at /users')
    done();
  });
});

it('User GET Response Status Code', function(done) {
  request.get('http://localhost:3000/users', function(error, response, body) {
    expect(response.statusCode).to.equal(200);
    done();
  });
});

it('User Page POST', function(done) {
  request.post('http://localhost:3000/users', function(error, response, body) {
    expect(body).to.equal('responding to a POST at /users')
    done();
  });
});

it('User POST Response Status Code', function(done) {
  request.post('http://localhost:3000/users', function(error, response, body) {
    expect(response.statusCode).to.equal(201);
    done();
  });
});

it('User Page PUT', function(done) {
  request.put('http://localhost:3000/users', function(error, response, body) {
    expect(body).to.equal('responding to a PUT at /users')
    done();
  });
});

it('User PUT Response Status Code', function(done) {
  request.put('http://localhost:3000/users', function(error, response, body) {
    expect(response.statusCode).to.equal(200);
    done();
  });
});

it('User Page PATCH', function(done) {
  request.patch('http://localhost:3000/users', function(error, response, body) {
    expect(body).to.equal('responding to a PATCH at /users')
    done();
  });
});

it('User PATCH Response Status Code', function(done) {
  request.patch('http://localhost:3000/users', function(error, response, body) {
    expect(response.statusCode).to.equal(200);
    done();
  });
});
