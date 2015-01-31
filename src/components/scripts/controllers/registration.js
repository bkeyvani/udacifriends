app.controller('RegistrationController',
  ['$scope', '$location', 'AuthFactory', 'currentAuth',
  function($scope, $location, AuthFactory, currentAuth) {

    console.log('from RegistrationController');
    console.log('currentAuth', currentAuth);
    console.dir(currentAuth);

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
      .then(function(regUser) {
        $scope.login();
      }).catch(function(error) {
        $scope.message = error.toString();
      });
    }
  }
]);
