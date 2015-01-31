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
    controller: 'RegistrationController',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["AuthFactory", function(Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return Auth.authObj.$waitForAuth();
      }]
    }
  }).when('/register', {
    templateUrl: 'views/register.html',
    controller: 'RegistrationController'
  }).when('/friends', {
    templateUrl: 'views/friends.html'
  }).when('/messages', {
    templateUrl: 'views/messages.html',
    controller: 'MessagesController',
    resolve: {
      // controller will not be loaded until $requireAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["AuthFactory", function(Auth) {
        // $requireAuth returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.authObj.$requireAuth();
      }]
    }
  }).otherwise({
    redirectTo: '/'
  });
}]);

