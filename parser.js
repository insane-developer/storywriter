module.exports = function parse(str) {
    var chapters = [];

    chapters = tokenize(/=([^=]+)=\n+/gm, str);

    chapters = chapters.map(function(chapter) {
        var commits = tokenize(/==([^=]+)==\n+/gm, chapter.text);

        commits = commits.map(processCommits);

        return {
            title: chapter.token,
            commits: commits
        };

    });

    return chapters;
};

function processCommits(commit, i, commits) {
    console.log('commit', commit);
    var match = commit.text.match(/(?:<-([^\n]+)\n)?(\d\d:\d\d\s\d\d\.\d\d\.\d\d)\n+([\s\S]+)/m);

    return {
        title: commit.token,
        parent: match[1],
        time: match[2],
        text: match[3]
    }
};

function tokenize(re, str) {
    var matches = [],
        res = [];


    str.replace(re, function (match, token, index) {
        console.log(token, index, index + match.length);
        matches.push({
            content: token,
            start: index,
            end: index + match.length
        });
    });


    for (var i = 0; i < matches.length - 1; i++) {
        var from = matches[i].end,
            to = matches[i + 1].start;

        res.push({
            token: matches[i].content,
            text: str.slice(from, to)
        });
    }
    var last = matches.pop();
    res.push({
        token: last.content,
        text: str.slice(last.end, str.length)
    });
    return res;

}