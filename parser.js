module.exports = function parse(str) {
    var chapters = [];

    str.replace(/=([^=]+)=\n(.+)(!:=(^=))/g, function (match, title, text) {
        chapters.push({
            title: title,
            text: text
        });
    })
    return chapters;
};