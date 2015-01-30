var app = angular
  .module('udacifriendsApp', ['ngRoute', 'firebase', 'appControllers'])
  .constant('FIREBASE_URL', 'https://udacifriendz.firebaseio.com/');

var appControllers = angular.module('appControllers', ['firebase']);

app.config(['$routeProvider',
function($routeProvider, FIREBASE_URL) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
  }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
  }).
    when('/friends', {
      templateUrl: 'views/friends.html'
  }).
    when('/messages', {
      templateUrl: 'views/messages.html',
      controller: 'MessagesController'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);

