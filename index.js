ioc = require('./server/boot/ioc');
require('./server/boot/autoload')(ioc);

ioc.inject(function(config, app){
    var l = app.listen(config.port);
    var m = app.service('messages');
    m.find({},function(err,recs){
        console.log(err,recs);
        if(recs && recs.length < 1){
            console.log('creating 1000 demo messages on database:',config.database);
            var uuid = require('node-uuid');
            for (i = 0; i < 1000; i++) {
                m.create({message: 'message' + uuid.v4(), approved: false, onair: false},function(err){
                    if(err)
                        console.error(err);
                });
            }
        }
    });

//    var uuid = require('node-uuid');
//    var m = app.service('messages');
//    setInterval(function() {
//        m.create({message: 'testing 123' + uuid.v4(), approved: false}, function (err, message) {
//            //console.log('message create', message);
//        });
//    },60);
    console.log(config.name + ' should be running on port '+config.port);
});