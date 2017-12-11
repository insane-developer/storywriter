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
branches.forEach(branch => {
    if (branch.parent) {
        writer.checkout(branch.parent);
    }

    writer.branch(branch.title);
    branch.commits.forEach(commit => {
        writer.writeStory(commit.text);
        writer.commit(commit.title, commit.time);
    });
});

});


//console.log(JSON.stringify(, null, '  '));
