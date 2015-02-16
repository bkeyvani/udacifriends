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

    $scope.addFriendById = function(elem) {
      var user, uid, fullName;

      //console.log('elem: ', elem);
      user = elem.user;
      uid = user.id;
      fullName = user.firstname + ' ' + user.lastname;
      $scope.query = fullName;
      $scope.friendId = uid;
      $scope.ddCtrl = false; // hide dropdown
      console.log('scope: ', $scope);
    };

    $scope.deleteFriend = function(key) {
      friends.$remove(key);
    }; //deleteFriend

    $scope.users = Users.all();

    $scope.search = function(user) {
      if ($scope.query) {
        var firstName, lastName, fullName;

        firstName = user.firstname.toLowerCase();
        lastName = user.lastname.toLowerCase();
        fullName = firstName + ' ' + lastName;
        query = $scope.query.toLowerCase();

        return !!((firstName.indexOf(query || '') !== -1 ||
                   lastName.indexOf(query || '') !== -1 ||
                   fullName.indexOf(query || '') !== -1));
      }
    };

    $scope.showDropDown = function() {
      $scope.ddCtrl = true;
    };

    $scope.hideDropDown = function() {
      $scope.ddCtrl = false;
      //console.log($scope);
    };
  }
]); // FriendsController
