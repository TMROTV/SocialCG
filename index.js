ioc = require('./server/boot/ioc');
require('./server/boot/autoload')(ioc);

ioc.inject(function(config, app){
    app.get('*', require('./server/boot/notfound'));
    var l = app.listen(config.port);
    console.log(config.name + ' should be running on port '+config.port);
});