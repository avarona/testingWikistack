/* eslint-disable */
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const spies = require('chai-spies');
const things = require('chai-things');
chai.use(spies);
chai.use(things);
const model = require('../models');
const Page = model.Page;
const User = model.User;

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
  beforeEach(function(done) {
    User.sync({ force: true })
    .then(function() {
      return Page.sync({ force: true })
        .then(function() {
          done();
        })
    })
    .catch(done);
  });
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
    describe('findByTag', function () {
      beforeEach(function() {
        return Page.create({
          title: 'Testing the class method',
          content: 'Wooh this is still annoying',
          tags: ['annoying', 'thisisstillannoying']
        })
      })
      it('gets pages with the search tag', function() {
        return Page.findByTag('annoying')
        .then(function(pages) {
          expect(pages).to.have.lengthOf(1);
        })
      });
      it('does not get pages without the search tag', function() {
        return Page.findByTag('annoy')
        .then(function(pages) {
          expect(pages).to.have.lengthOf(0);
        })
      });
    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {
      beforeEach(function() {
          let data1 = {
            title: 'base page',
            content: 'base page content',
            tags: ['base', 'page']
          }
          let data2 = {
            title: 'similar page',
            content: 'similar page content',
            tags: ['similar', 'page']
          }
          let data3 = {
            title: 'unique page',
            content: 'unique page content',
            tags: ['unique']
          }
         return Promise.all([
           Page.create(data1),
           Page.create(data2),
           Page.create(data3)
         ])
        .then(function(pages) {
          return pages;
        });
      });
      it('never gets itself', function() {
        pages.then(function() {
          pages.each(function(page) {
            console.log(page);
          });
        });
      });
      it('gets other pages with any common tags', function() {

      });
      it('does not get other pages without any common tags', function() {

      });
    });
  });

  describe('Validations', function () {
    it('errors without title', function() {
      Page.create({
        content: 'this is without title'
      })
      .then(function(page) {
        Page.validate()
      })
    });
    it('errors without content', function() {
      Page.create({
        title: 'this is without content'
      })
    });
    it('errors given an invalid status', function() {
      Page.create({
        title: 'invalid status',
        content: 'this is with an invalid status',
        status: 'NO'
      })
    });
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });
});
