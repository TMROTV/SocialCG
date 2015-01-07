ioc = require('./server/boot/ioc');
require('./server/boot/autoload')(ioc);

ioc.inject(function(config, app){
    var l = app.listen(config.port);
//    var uuid = require('node-uuid');
//    var m = app.service('messages');
//    setInterval(function() {
//        m.create({message: 'testing 123' + uuid.v4(), approved: false}, function (err, message) {
//            //console.log('message create', message);
//        });
//    },60);
    console.log(config.name + ' should be running on port '+config.port);
});