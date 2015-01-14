module.exports = function (feathers) {
    var bodyParser = require('body-parser');
    var app = feathers();

    app.configure(feathers.rest())
        .configure(feathers.socketio())
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: true }))
        .use(feathers.static(__dirname + '/../../build'))
        .use(require('./notfound'));
    return app;
};