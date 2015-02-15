app.controller('FriendsController', ['$scope', '$firebase', 'FIREBASE_URL', 'currentAuth', 'Users', 'User',
  function($scope, $firebase, FIREBASE_URL, currentAuth, Users, User) {

    var currentUser = currentAuth.uid;
    //$scope.friends = {};
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

    $scope.friend = {};

    $scope.addFriend = function() {
      friendId = $scope.friendKW;
      user = User(friendId);
      user.$loaded().then(function() {
        $scope.friend.friendName = user.getFullName();

        friends.$set(friendId, {
          fullName: $scope.friend.friendName,
          date: Firebase.ServerValue.TIMESTAMP
        }).then(function(ref) {
            $scope.friendName = '';
          });
      });
    }; // addFriend

    $scope.deleteFriend = function(key) {
      friends.$remove(key);
    }; //deleteFriend

    $scope.getAllUsers = function() {
      $scope.users = Users.all();
    }; // getAllUsers

    $scope.searchByKeyword = function(kw) {
      Users.byKeyword(kw);
    };

    //$scope.friendsCnt = function () {
      //cnt = friendsService.getFriendsCnt();
      //return cnt;
    //};

    //var fArray = friendsService.fArray;
    //fArray.$watch(function(event) {
      //$scope.friendsCnt = fArray.length;
    //});

    //$scope.friends = friendsService.fObj;
    //console.log($scope.friends);

    //$scope.addFriend = function() {
      //friendsService.addFriend($scope.friendId);
    //};
  }
]); // FriendsController
