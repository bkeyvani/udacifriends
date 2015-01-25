app.controller('RegistrationController',
  ['$scope', '$firebaseAuth', '$location', 'FIREBASE_URL',
  function($scope, $firebaseAuth, $location, FIREBASE_URL, Authentication) {

    $scope.login = function() {
      Authentication.login($scope.user)
      .then(function(authData) {
        console.log('Logged in as:', authData.uid);
        $location.path('/messages');
      }).catch(function(error) {
        console.error('Authentication failed:', error);
        $scope.message = error.toString();
      });
    }

    $scope.register = function() {
      $location.path('/messages');
    } //login
  }
]);
