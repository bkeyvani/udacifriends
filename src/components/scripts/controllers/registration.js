app.controller('RegistrationController',
  ['$scope', '$rootScope', '$location', 'AuthFactory',
  function($scope, $rootScope, $location, AuthFactory) {

    $scope.login = function() {
      AuthFactory.login($scope.user)
      .then(function(authData) {
        $location.path('/messages');
      }).catch(function(error) {
        console.error('Authentication failed:', error);
        $scope.message = error.toString();
      });
    }

    $scope.register = function() {
      $location.path('/messages');
    } // login
  }
]);
