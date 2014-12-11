module.exports = function(mongodb,app,config){
    app.use('/users', mongodb({
        collection: 'users',
        database: config.database
    }));
};