module.exports = function (ioc) {
    var fs = require('fs');
    fs.readdirSync('./server/models')
        .forEach(function (val, index, array) {
            ioc.inject(require('./../models/' + val));
        });
};