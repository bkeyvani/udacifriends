app.controller('FriendsController', ['$scope', '$firebase', 'FIREBASE_URL', 'currentAuth', 'Users', 'User',
  function($scope, $firebase, FIREBASE_URL, currentAuth, Users, User) {

    var currentUser = currentAuth.uid;
    var ref = new Firebase(FIREBASE_URL).child('users').child(currentUser).child('friends');
    var friends = $firebase(ref);
    var friendsObj = friends.$asObject();
    var friendsArray = friends.$asArray();

    friendsObj.$loaded().then(function(data) {
      $scope.friends = friendsObj;
    }); // friends Object Loaded

    friendsArray.$loaded().then(function(data) {
      $scope.friendsCnt = friendsArray.length;
    }); // friends Array Loaded

    friendsArray.$watch(function(event) {
      $scope.friendsCnt = friendsArray.length;
    });

    $scope.addFriend = function() {
      var friendId, friendName;

      friendId = $scope.query;
      user = User(friendId);
      user.$loaded().then(function() {
        friendName = user.getFullName();

        friends.$set(friendId, {
          fullName: friendName,
          date: Firebase.ServerValue.TIMESTAMP
        }).then(function(ref) {
            $scope.query = '';
          });
      });
    }; // addFriend

    $scope.deleteFriend = function(key) {
      friends.$remove(key);
    }; //deleteFriend

    $scope.users = Users.all();

    $scope.search = function(user) {
      if ($scope.query) {
        return !!((user.firstname.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1
                || user.lastname.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1));
      }
    };
  }
]); // FriendsController
