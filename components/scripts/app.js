var app = angular.module('udacifriendsApp', ['ngRoute', 'appControllers']);

var appControllers = angular.module('appControllers', []);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);
