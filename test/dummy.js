import { Model, Collection, Events } from '../lib/index';

QUnit.module("Module A");

test("first test within module", 1, function () {
    ok(true, "a dummy");
});

test("second test within module", 2, function (assert) {
    expect( 2 );
    ok(true, "dummy 1 of 2");
    ok(true, "dummy 2 of 2");
});


var doc, collection;
var Klass = Collection.extend({
  url: function() { return '/collection'; }
});
var ProxyModel = Model.extend();
doc = new ProxyModel({
  id: '1-the-tempest',
  title: 'The Tempest',
  author: 'Bill Shakespeare',
  length: 123
});
collection = new Klass();
collection.add(doc);


QUnit.test('a failing create returns model with errors', function(assert) {
  var ValidatingModel = Model.extend({
    validate: function(attrs) {
      return 'fail';
    }
  });
  var ValidatingCollection = Collection.extend({
    model: ValidatingModel
  });
  var collection = new ValidatingCollection();
  var m = collection.create({foo: 'bar'});
  assert.equal(m.validationError, 'fail');
  assert.equal(collection.length, 1);
});