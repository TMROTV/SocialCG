module.exports = function(mongodb,app,config){
    app.use('/messages', mongodb({
        collection: 'messages',
        db: config.database
    }));
    app.service('messages').on('updated',function(item){
        console.log('messages updated',item);
    });
    app.service('messages').on('patched',function(item){
        console.log('messages patched',item);
    });
    app.service('messages').on('created',function(item){
        console.log('messages patched',item);
    });
};