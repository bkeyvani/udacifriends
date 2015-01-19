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
