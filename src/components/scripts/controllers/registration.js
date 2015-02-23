// Registration Contraller

app.controller('RegistrationCtrl', ['$scope', '$location', 'AuthFctr', 'currentAuth',
  function($scope, $location, AuthFctr, currentAuth) {

    if (currentAuth) {  // if a user is already logged in
      $location.path('/messages');
    } else {
      $scope.login = function() {
        AuthFctr.login($scope.user)
        .then(function() {
          $location.path('/messages');
        }).catch(function(error) {
          $scope.message = 'Incorrect Username or Password. Please try again.';
        });
      };

      $scope.register = function() {
        AuthFctr.register($scope.user)
        .then(function(regUser) {
          $scope.login();
        }).catch(function(error) {
          $scope.message = error.toString();
        });
      }
    }
  }
]); // RegistrationCtrl
