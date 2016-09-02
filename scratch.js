// import CrapModule from './testmodule'
import Model from './lib/model';
import Collection from './lib/collection';
import assert from 'assert';

// const m = new Model();
// console.log('ok', m);

// const MyModel = Model.extend();

// const MyCollection = Collection.extend({
//     model: MyModel
// });


// let collection = new MyCollection();

// collection.add({name:'charles', age:58});

// console.log( collection.toJSON() );


// var ProxyModel = Model.extend();
// var Klass = Collection.extend({
//   url: function() { return '/collection'; }
// });

// const doc = new ProxyModel({
//   id: '1-the-tempest',
//   title: 'The Tempest',
//   author: 'Bill Shakespeare',
//   length: 123
// });
// const collection = new Klass();
// collection.add(doc);


var collection = new Collection([{a: 'a'}, {b: 'b'}, {c: 'c'}]);
var array = collection.slice(1, 3);
assert.equal(array.length, 2);
assert.equal(array[0].get('b'), 'b');