/* eslint-disable */
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const model = require('../models');
const Page = model.Page;

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
  describe('Virtuals', function () {
    var page;
    beforeEach(function(done) {
      page = Page.build();
      done();
    });
    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function() {
          page.urlTitle = 'Testing_the_route';
          expect(page.route).to.equal('/wiki/Testing_the_route');
      });
    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML', function() {
        page.content = 'Wooh this is annoying';
        expect(page.renderedContent).to.equal('<p>Wooh this is annoying</p>\n');
      });
    });
  })

  describe('Class methods', function () {
    var page;
    beforeEach(function(done) {
      page = Page.create({
        title: 'Testing the class method',
        content: 'Wooh this is still annoying',
        tags: ['annoying', 'thisisstillannoying']
      })
      .then(function() {
        done();
      })
      .catch(done);
    })

    describe('findByTag', function () {
      it('gets pages with the search tag', function() {

      });
      it('does not get pages without the search tag',function() {});
    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {
      it('never gets itself');
      it('gets other pages with any common tags');
      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });
});
