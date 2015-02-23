// Status Controller

app.controller('StatusCtrl', ['$scope', '$rootScope', '$location', '$firebase', 'AuthFctr', 'FIREBASE_URL',
  function($scope, $rootScope, $location, $firebase, AuthFctr, FIREBASE_URL) {

    $rootScope.location = $location;
    $scope.logout = function() {
      AuthFctr.logout();
    }; // logout

    $rootScope.authObj = AuthFctr.authObj;

    $rootScope.authObj.$onAuth(function(authData) {
      if (authData) {
        var ref = new Firebase(FIREBASE_URL + 'users/' + authData.uid)
        var user = $firebase(ref).$asObject();

        user.$loaded().then(function() {
          $rootScope.currentUser = user;
        });
      } else {
          $rootScope.currentUser = null;
          $location.path('/logout'); // TODO: add a separate logout page (?)
      }
    }); // authObj $onAuth event
  }
]); // StatusCtrl
