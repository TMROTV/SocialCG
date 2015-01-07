'use strict';

module.exports = function (app) {
    var c = function ($scope, remoteService, $interval) {

        var messages = remoteService.messages;
        var approvals = remoteService.approvals;

        $scope.unapproveall = function(){
            approvals.remove('all', function (err, message) {
                if(err)
                    alert(err);
            });
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

        $scope.myData = [];
        $scope.gridOpts = {
            enableFiltering: true,
            showFilter: true,
            showFooter: true,
            enableRowSelection: false,
            multiSelect: false,
            columnDefs: [
                { field: 'message', displayName: 'Message',width:'*' },
                { field: 'approved', displayName: 'Approved',width:70 },
                { field: 'button', displayName: 'Approve',width:140 , cellTemplate: '<div><button class="btn btn-xs btn-primary" ng-disabled="row.entity.approved" ng-click="approvemessage(row.entity._id); $event.stopPropagation();">Approve</button><button class="btn btn-xs btn-primary" ng-disabled="!row.entity.approved" ng-click="unapprovemessage(row.entity._id); $event.stopPropagation();">Unapprove</button></div>' },

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