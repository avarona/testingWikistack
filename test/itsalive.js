/* eslint-disable */
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const model = require('../models');

describe('first test', function() {
  it('basic arithmetic', function() {
    expect(2 + 2).to.equal(4);
  });
  it('should take 1000 milliseconds', function(done) {
    let start = new Date();
    setTimeout(function() {
      let duration = new Date() - start;
      expect(duration).to.be.closeTo(1000, 50);
      done();
    }, 1000)
  });
  it('will invoke a function once per element', function() {
    let arr = [1, 2, 3];
    function logNth (val, i) {
      console.log(`index ${i}: ${val}`);
    }
    logNth = chai.spy(logNth);
    arr.forEach(logNth);
    expect(logNth).to.have.been.called.exactly(arr.length);
  });
});

describe('Page model', function() {
  describe('attributes', function() {
    it('has 5 properties', function() {
      model.Page
    });
    it('has title property', function() {});
    it('has urlTitle property', function() {});
    it('has content property', function() {});
    it('has status property', function() {});
    it('has tags property', function() {});
  });
  describe('route', function() {});
});
