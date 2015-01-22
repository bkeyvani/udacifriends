(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = angular.module('udacifriendsApp', ['ngRoute', 'appControllers']);

var appControllers = angular.module('appControllers', []);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html'
  }).
    when('/register', {
      templateUrl: 'views/register.html'
  }).
    when('/friends', {
      templateUrl: 'views/friends.html'
  }).
    when('/messages', {
      templateUrl: 'views/messages.html'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);


app.controller('RegistrationController', function($scope, $location){

  $scope.login = function() {
    $location.path('/friends');
  } // login

  $scope.register = function() {
    $location.path('/messages');
  } // register
}); //RegistrationController

},{}]},{},[1])