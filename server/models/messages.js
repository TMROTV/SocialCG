module.exports = function(mongodb,app,config){
    app.use('/messages', mongodb({
        collection: 'messages',
        database: config.database
    }));
};