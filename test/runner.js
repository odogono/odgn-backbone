import _ from 'underscore';
const Path = require('path');
var testrunner = require("qunit");

testrunner.setup({
    log: {
        assertions: true,
        summary: true
    }
});

console.log('running from ', __dirname);

const config = {
    deps: {path: "node_modules/underscore", namespace: "_"}
};

// using testrunner callback
// testrunner.run({
//     deps: {path: "node_modules/underscore", namespace: "_"},
//     code: Path.join(__dirname, '../lib/events.js'),
//     tests: Path.join(__dirname, 'events.js')
// }, (err, report) => {
//     if( err ){ console.error(err); }
//     console.dir(report);
// });

// testrunner.run({
//     deps: {path: "node_modules/underscore", namespace: "_"},
//     code: Path.join(__dirname, '../lib/model.js'),
//     tests: Path.join(__dirname, 'model.js')
// }, (err, report) => {
//     if( err ){ console.error(err); }
//     console.dir(report);
// });




testrunner.run(_.extend({
    code: Path.join(__dirname, '../lib/model.js'),
    tests: Path.join(__dirname, 'dummy.js')
}, config), (err, report) => {
    if( err ){ console.error(err); }
    console.dir(report);
});