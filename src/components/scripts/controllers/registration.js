app.controller('RegistrationController',
  ['$scope', '$location', 'AuthFactory', 'currentAuth',
  function($scope, $location, AuthFactory, currentAuth) {

    if (currentAuth) {  // if a user is already logged in
      $location.path('/messages');
    } else {
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
  }
]);
