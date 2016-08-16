import _ from 'underscore';
const Path = require('path');
var testrunner = require("qunit");

testrunner.setup({
    log: {
        assertions: true,
        summary: true
    },

    maxBlockDuration: 4000
});

console.log('running from ', __dirname);

const config = {
    deps: {path: "node_modules/underscore", namespace: "_"}
};

// Events
testrunner.run(_.extend({
    code: Path.join(__dirname, '../lib/events.js'),
    tests: Path.join(__dirname, 'events.js')
}, config), (err, report) => {
    if( err ){ console.error(err); }
    console.dir(report);
});

// Collection
testrunner.run(_.extend({
    code: Path.join(__dirname, '../lib/collection.js'),
    tests: Path.join(__dirname, 'collection.js')
}, config), (err, report) => {
    if( err ){ console.error(err); }
    console.dir(report);
});

// Model
testrunner.run(_.extend({
    code: Path.join(__dirname, '../lib/model.js'),
    tests: Path.join(__dirname, 'model.js')
}, config), (err, report) => {
    if( err ){ console.error(err); }
    console.dir(report);
});


// testrunner.run(_.extend({
//     code: Path.join(__dirname, '../lib/model.js'),
//     tests: Path.join(__dirname, 'dummy.js')
// }, config), (err, report) => {
//     if( err ){ console.error(err); }
//     console.dir(report);
// });