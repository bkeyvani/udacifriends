app.controller("RegistrationController", ["$scope", "$firebaseAuth", "$location",
  function($scope, $firebaseAuth, $location) {
    var ref = new Firebase("https://udacifriendz.firebaseio.com/");
    var auth = $firebaseAuth(ref);

    $scope.login = function() {
      auth.$authWithPassword({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(authData) {
        console.log("Logged in as:", authData.uid);
        $location.path('/meetings');
      }).catch(function(error) {
        console.error("Authentication failed:", error);
        $scope.message = error.toString();
      });
    }

    $scope.register = function() {
      $location.path('/meetings');
    } //login
  }
]);
