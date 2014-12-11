module.exports = function(mongodb,app,config){
    var approvals = {
        find: function(params, callback) {
            app.service('users').create({name:'fromapprovals!!!!'+new Date},{},function(err,res){
               callback(err,res);
            });
        },
        get: function(id, params, callback) {},
        create: function(data, params, callback) {},
        update: function(id, data, params, callback) {},
        patch: function(id, data, params, callback) {},
        remove: function(id, params, callback) {}
    }

    app.use('/approvals', approvals);
};