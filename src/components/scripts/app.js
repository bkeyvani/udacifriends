var app = angular.module('udacifriendsApp',
  ['ngRoute', 'firebase', 'appControllers']);

var appControllers = angular.module('appControllers', ['firebase']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
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

