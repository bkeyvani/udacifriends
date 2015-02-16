// Messages Factory

app.factory('MessagesFctr', ['$firebase', 'FIREBASE_URL',
  function($firebase, FIREBASE_URL) {

  return function(userId) {
    var ref = new Firebase(FIREBASE_URL).child('users').child(userId).child('messages');
    var messages = $firebase(ref);
    var messagesObj = messages.$asObject();
    var messagesArray = messages.$asArray();

    return {
      mObj: messagesObj,
      mArr: messagesArray
    };
  };
}]);
