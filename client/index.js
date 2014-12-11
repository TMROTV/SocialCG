'use strict';

window.$ = require('jquery');
window.jQuery = window.$;
require('angular');
require('bootstrap');
require('./templates');

var uiRoute = require('angular-ui-router');
var app = angular.module('app', [uiRoute,'templates']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home.html',
            controller: require('./controllers/home')(app)
        })
        .state('second', {
            url: '/second',
            templateUrl: 'second.html',
            controller: require('./controllers/home')(app)
        });
});