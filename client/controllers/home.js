'use strict';

module.exports = function (app) {
    var c = function ($scope, remoteService, $interval) {

        var messages = remoteService.messages;
        var approvals = remoteService.approvals;
        var onair = remoteService.onair;

        $scope.unapproveall = function(){
            approvals.remove('all', function (err, message) {
                if(err)
                    alert(err);
            });
        };

        $scope.clearcaspar = function(){
            onair.remove('casparclear');
        };

        $scope.approvemessage = function (id) {
            approvals.create({id:id}, function (err, message) {
                if(err)
                    alert(err);
            });
        };

        $scope.unapprovemessage = function (id) {
            approvals.remove(id, function (err, message) {
                if(err)
                    alert(err);
            });
        };

        $scope.sendtoair = function(id){
            onair.create({id:id}, function (err, message) {
                if(err)
                    alert(err);
            });
        };



        $scope.myData = [];
        $scope.gridOpts = {
            enableFiltering: true,
            showFilter: true,
            showFooter: true,
            enableRowSelection: false,
            multiSelect: false,
            //rowHeight: 50,
            columnDefs: [
                { field: 'message', displayName: 'Message',width:'*' },
                { field: 'sourcedate', displayName: 'Time',width:'*' },
                { field: 'handle', displayName: 'Handle',width:'*' },
                { field: 'actions', displayName: 'Actions',width:'230'
                   ,cellTemplate: '<div>'
                   + '<button class="btn btn-xs btn-primary" ng-disabled="row.entity.approved" ng-click="approvemessage(row.entity._id); $event.stopPropagation();">Approve</button>'
                   + ' <button class="btn btn-xs btn-primary" ng-hide="!row.entity.approved" ng-disabled="!row.entity.approved || row.entity.onair" ng-click="unapprovemessage(row.entity._id); $event.stopPropagation();">Unapprove</button>'
                   + ' <button class="btn btn-xs btn-warning" ng-hide="!row.entity.approved" ng-disabled="row.entity.onair" ng-click="sendtoair(row.entity._id); $event.stopPropagation();">Send To Air</button>'
                   + '</div>'
                }
            ],
            data: 'myData'
        };

        messages.find({}, function (err, messages) {
            $scope.$apply(function () {
                angular.forEach(messages, function (message) {
                    $scope.myData.push(message);
                });
            });
        });

        messages.on('created', function (message) {
            $scope.$apply(function () {
                $scope.myData.push(message);
            });
        });

        var update = function (updated) {
            angular.forEach($scope.myData, function (message, index) {
                if (message._id === updated._id) {
                    $scope.$apply(function () {
                        angular.extend(message, updated);
                        $scope.myData[index] = message;
                    });
                }
            });
        }

        messages.on('updated', update);
        messages.on('patched', update);
    };
    app.controller('homeCtrl', c);
    return c;
};