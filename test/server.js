var supertest = require("supertest")
var assert = require("assert")
var app = require("..")

describe("GET /_monitor/ping", function() {
  it("returns 200", function(done) {
    supertest(app)
      .get("/_monitor/ping")
      .expect(200, done)
  })
})

describe("GET /_monitor/status", function() {
  it("returns 200 and a json object", function(done) {
    supertest(app)
      .get("/_monitor/status")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)
        assert(res.body.name)
        assert(res.body.pid)
        assert.equal(typeof res.body.uptime, "number")
        assert(res.body.rss)
        done()
      })
  })
})

describe('GET /', function() {
  it('returns 200', function(done) {
    supertest(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)
        done()
      })
  })
})

describe('GET /cli/install', function() {
  it('returns 200', function(done) {
    supertest(app)
      .get('/cli/install')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)
        done()
      })
  })
})

describe('GET /cli/nonexistent', function() {
  it('returns a 404', function(done) {
    supertest(app)
      .get('/cli/nonexistent')
      .expect('Content-Type', /html/)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err)
        done()
      })
  })
})
