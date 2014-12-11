'use strict';

module.exports = function(app) {
    var c = function ($scope) {
        $scope.text = "test text";
    };
    app.controller('homeCtrl',c);
    return c;
};