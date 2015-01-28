app.controller('StatusController',
function($scope, $rootScope, $firebaseAuth, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL);
  $rootScope.authObj = $firebaseAuth(ref);

  $rootScope.authObj.$onAuth(function(authData) {
    if (authData) {
      $scope.userEmail = authData.password.email;
    } else {
      console.log("Logged out");
    }
  });
});
