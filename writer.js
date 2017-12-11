var cp = require('child_process'),
    fs = require('fs'),
    path = require('path');

var Repo = module.exports = function (rootDir) {
    this.root = path.resolve(rootDir);

    var res = cp.execSync(`git init "${this.root}"`);
    if (res.error) {
        throw res.error;
    }
    this.commits = new Map();
    console.log('Init command:', res.toString('utf-8'));
};

Repo.prototype = {
    getStoryFile: function () {
        return path.join(this.root, 'story.md');
    },
    writeStory: function (text) {
        fs.writeFileSync(this.getStoryFile(), text, 'utf-8');
        return this;
    },
    commit: function (message, time) {
        console.log(cp.execSync(`git commit -a -m "${message}`, {
            cwd: this.root
        }));
        return this;
    },
    checkout: function (message) {
        var hash = this.commits.get(message);

        console.log(cp.execSync(`git checkout ${hash}`));
    }
}
