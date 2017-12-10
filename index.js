#!/usr/bin/env node
var fs = require('fs'),
    path = require('path'),
    parser = require('./parser.js'),
    Writer = require('./writer.js'),
    file = fs.readFileSync(path.resolve(process.argv[2]), 'utf-8'),
    story = parser(file);

story.forEach(chapter => {
    var writer = new Writer(`../catwalk/${chapter.title}`),
        branches = chapter.branches;


});


//console.log(JSON.stringify(, null, '  '));

