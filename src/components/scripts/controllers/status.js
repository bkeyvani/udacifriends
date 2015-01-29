app.controller('StatusController',
function($scope, $rootScope, $firebase, AuthFactory, FIREBASE_URL, $location) {

  $scope.logout = function() {
    AuthFactory.logout();
  } // logout

  $rootScope.authObj = AuthFactory.authObj;

  $rootScope.authObj.$onAuth(function(authData) {
    if (authData) {
      var ref = new Firebase(FIREBASE_URL + 'users/' + authData.uid)
      var user = $firebase(ref).$asObject();

      user.$loaded().then(function() {
        $rootScope.currentUser = user;
      });
    } else {
        $rootScope.currentUser = null;
    }
  }); // authObj $onAuth event
});
