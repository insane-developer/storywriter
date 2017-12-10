var fs = require('fs'),
    path = require('path'),
    parser = require('./parser.js'),
    file = fs.readFileSync(path.resolve(process.argv[2]), 'utf-8');

console.log(JSON.strigify(parser(file), null, '  '));
