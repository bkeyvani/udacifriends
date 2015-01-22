app.controller('FriendsController',
  function($scope, $firebase) {

    var fb = new Firebase('https://udacifriendz.firebaseio.com/friends');
    var friends = $firebase(fb);

    $scope.friends = friends.$asObject();
  }
); // FriendsController
