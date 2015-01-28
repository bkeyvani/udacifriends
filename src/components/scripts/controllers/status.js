app.controller('StatusController',
function($scope, $rootScope, AuthFactory) {

  $rootScope.authObj = AuthFactory.authObj;

  $rootScope.authObj.$onAuth(function(authData) {
    if (authData) {
      $scope.userEmail = authData.password.email;
    } else {
      console.log("Logged out");
    }
  });
});
