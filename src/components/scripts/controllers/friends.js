app.controller('FriendsController', ['$scope', '$firebase', 'FIREBASE_URL', 'currentAuth', 'Users', 'User', 'SearchFctr',
  function($scope, $firebase, FIREBASE_URL, currentAuth, Users, User, SearchFctr) {

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

    $scope.addFriend = function(friendId) {
      var friendId, friendName;

      friendId = $scope.friendId;
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

    $scope.addFriendById = function(user) {
      // TODO: refactor into search directive
      console.log(user);
      var fullName;

      fullName = user.firstname + ' ' + user.lastname;
      $scope.query = fullName;
      $scope.friendId = user.$id;
      $scope.ddCtrl = false; // hide dropdown
    }; // addFriendById

    $scope.deleteFriend = function(key) {
      friends.$remove(key);
    }; //deleteFriend

    $scope.users = Users.all();

    $scope.search = function(user) {
      if ($scope.query) {
        return SearchFctr(user, $scope.query);
      }
    }; // search

    $scope.showDropDown = function() {
      $scope.ddCtrl = true;
    }; // showDropDown

    $scope.hideDropDown = function() {
      $scope.ddCtrl = false;
    }; // hideDropDown
  }
]); // FriendsController
