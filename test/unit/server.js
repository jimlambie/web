var sinon = require('sinon');
var api = require(__dirname + '/../../bantam/lib/api');
var Server = require(__dirname + '/../../bantam/lib');
var should = require('should');
var _ = require('underscore');
var Page = require(__dirname + '/../../bantam/lib/page');
var Controller = require(__dirname + '/../../bantam/lib/controller');
var help = require(__dirname + '/help');

describe('Server', function (done) {

  it('should export function that allows adding components', function (done) {
    Server.addComponent.should.be.Function;
    done();
  });

  it('should export function that allows getting components', function (done) {
    Server.getComponent.should.be.Function;
    done();
  });

  it('should allow adding components', function (done) {

    Server.app = api();

    var name = 'test';
    var schema = help.getPageSchema();
    var page = Page(name, schema);

    Server.components = {};

    Server.addComponent({
        key: page.key,
        route: page.route,
        component: { page: page }
    }, false);

    Object.keys(Server.components).length.should.eql(1);

    done();
  });

  it('should allow getting components by key', function (done) {

    Server.app = api();

    var name = 'test';
    var schema = help.getPageSchema();
    var page = Page(name, schema);

    Server.addComponent({
        key: page.key,
        route: page.route,
        component: { page: page }
    }, false);

    Server.getComponent('test').should.not.be.null;

    done();
  });

  // it('should attach name to page', function (done) {
  //   var name = 'test';
  //   var schema = help.getPageSchema();
  //   page(name, schema).name.should.eql('test');
  //   done();
  // });
})
