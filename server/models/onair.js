module.exports = function (mongodb, app) {
    //This REST model is a proxy to the messages model for pushing graphics to air
    var notapp = function (id, params, callback) {
        callback('NOT APPLICABLE');
    };

    var onair = {
        find: function (params, callback) {
            app.service('messages')
                .find({query: {onair: true}}, callback);
        },
        get: notapp,
        create: function (data, params, callback) {
            //TODO: Try to send to caspar and wait for success, then update the records

            //first remove onair status of previous records
            app.service('messages')
                .find({query: {onair: true}}, function (err, recs) {
                    recs.forEach(function (rec) {
                        app.service('messages')
                            .patch(rec._id, {onair: false},{},function(){});
                    });
                });
            //now update the newly aired record
            app.service('messages')
                .patch(data.id, {onair: true}, callback);
        },
        update: notapp,
        patch: notapp,
        remove: function (id, params, callback) {
            if (id === 'all' || id === 'casparclear') {
                if (id === 'casparclear') {
                    console.log('TODO: implement caspar channel clear');
                    //TODO: clear caspar channel
                }

                app.service('messages')
                    .find({query: {onair: true}}, function (err, recs) {
                        var messages = app.service('messages');
                        recs.forEach(function (rec) {
                            messages.patch(rec._id, {onair: false},{},function(){});
                        });
                    });
            } else {
                app.service('messages')
                    .patch(id, {onair: false},{}, callback);
            }
        }
    };
    app.use('/onair', onair);
};