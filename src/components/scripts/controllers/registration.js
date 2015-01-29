app.controller('RegistrationController',
  ['$scope', '$location', 'AuthFactory',
  function($scope, $location, AuthFactory) {

    $scope.login = function() {
      AuthFactory.login($scope.user)
      .then(function() {
        $location.path('/messages');
      }).catch(function(error) {
        $scope.message = 'Incorrect Username or Password. Please try again.';
      });
    };

    $scope.register = function() {
      AuthFactory.register($scope.user)
      .then(function() {
        $scope.login();
      }).catch(function(error) {
        $scope.message = error.toString();
      });
    }
  }
]);
