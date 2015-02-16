// FriendsFactory

app.factory('FriendsFctr', ['$FirebaseObject', '$firebase', 'FIREBASE_URL',
  function($FirebaseObject, $firebase, FIREBASE_URL) {

  return function(userId) {
    var ref = new Firebase(FIREBASE_URL).child('users').child(userId).child('friends');
    var friends = $firebase(ref);
    var friendsObj = friends.$asObject();
    var friendsArray = friends.$asArray();

    return {
      fObj: friendsObj,
      fArr: friendsArray
    };
  };
}]);
