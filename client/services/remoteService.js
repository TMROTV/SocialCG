module.exports = function (app) {
    return app.factory('remoteService', function () {
        console.log('remoteserice init');
        var socket = require('socket.io-client')();

        var service = require('feathers-websocket-client');
        var users = service('/users', socket);
        var messages = service('/messages', socket);
        var approvals = service('/approvals', socket);
        var onair = service('/onair', socket);

        return {
            io: socket,
            servicefactory: service,
            users: users,
            messages: messages,
            approvals: approvals,
            onair: onair
        }
    });
}