app.controller('StatusController',
function($scope, $rootScope, AuthFactory, $location) {

  $scope.logout = function() {
    AuthFactory.logout();
  } // logout

  $rootScope.authObj = AuthFactory.authObj;

  $rootScope.authObj.$onAuth(function(authData) {
    if (authData) {
      console.log("User logged-in");
      $scope.userEmail = authData.password.email;
    } else {
      console.log("Not logged-in");
      $scope.userEmail = null;
      $location.path('/login');
    }
  }); // authObj $onAuth event
});
