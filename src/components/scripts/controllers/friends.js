app.controller('FriendsController',
  ['$scope', '$firebase', 'FIREBASE_URL', 'currentAuth', 'User',
  function($scope, $firebase, FIREBASE_URL, currentAuth) {

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
        friendId = $scope.friendName;
        friends.$set(friendId , {
          fullName: 'Your "best" Pal',
          date: Firebase.ServerValue.TIMESTAMP
        })
          .then(function(ref) {
            console.log(ref);
            $scope.friendName = '';
          });
      } // addFriend

      $scope.deleteFriend = function(key) {
        friends.$remove(key);
      } //deleteFriend
  }
]); // FriendsController
