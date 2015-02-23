var app = angular
  .module('udacifriendsApp', ['ngRoute', 'firebase', 'appControllers'])
  .constant('FIREBASE_URL', 'https://udacifriendz.firebaseio.com/');

var appControllers = angular.module('appControllers', ['firebase']);

app.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });
}]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'RegistrationCtrl',
    resolve: {
      "currentAuth": ["AuthFctr", function(Auth) {
        return Auth.authObj.$waitForAuth();
      }]
    }
  }).when('/register', {
    templateUrl: 'views/register.html',
    controller: 'RegistrationCtrl',
    resolve: {
      "currentAuth": ["AuthFctr", function(Auth) {
        return Auth.authObj.$waitForAuth();
      }]
    }
  }).when('/friends', {
    templateUrl: 'views/friends.html',
    controller: 'FriendsCtrl',
    resolve: {
      "currentAuth": ["AuthFctr", function(Auth) {
        return Auth.authObj.$requireAuth();
      }]
    }
  }).when('/messages', {
    templateUrl: 'views/messages.html',
    controller: 'MessagesCtrl',
    resolve: {
      "currentAuth": ["AuthFctr", function(Auth) {
        return Auth.authObj.$requireAuth();
      }]
    }
  }).when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeCtrl',
    resolve: {
      "currentAuth": ["AuthFctr", function(Auth) {
        return Auth.authObj.$waitForAuth();
      }]
    }
  }).otherwise({
    redirectTo: '/'
  });
}]);

