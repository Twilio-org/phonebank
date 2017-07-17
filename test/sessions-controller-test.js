var expect  = require('chai').expect;
var request = require('request');

it('Session Page POST', function(done) {
  request.post('http://localhost:3000/sessions', function(error, response, body) {
    expect(body).to.equal('responding to a POST request at /sessions')
    done();
  });
});

it('Session POST Response Status Code', function(done) {
  request.post('http://localhost:3000/sessions', function(error, response, body) {
    expect(response.statusCode).to.equal(201);
    done();
  });
});

it('Session Page DELETE', function(done) {
  request.delete('http://localhost:3000/sessions', function(error, response, body) {
    expect(body).to.equal('responding to a DELETE request at /sessions')
    done();
  });
});

it('Session DELETE Response Status Code', function(done) {
  request.delete('http://localhost:3000/sessions', function(error, response, body) {
    expect(response.statusCode).to.equal(200);
    done();
  });
});
