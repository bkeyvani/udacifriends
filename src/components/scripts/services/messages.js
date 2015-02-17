// Messages Factory

app.factory('MessagesFctr', ['$firebase', 'FIREBASE_URL',
  function($firebase, FIREBASE_URL) {

  return function(userId) {
    var ref = new Firebase(FIREBASE_URL).child('users').child(userId).child('messages');
    var messages = $firebase(ref);
    var messagesObj = messages.$asObject();
    var messagesArray = messages.$asArray();

    return {
      sync: messages,
      mObj: messagesObj,
      mArr: messagesArray,
      from: function(uId) {
        var query;
        self = this;
        self.result = {};

        query = ref.orderByChild("to").startAt(uId).endAt(uId).on("value",
          function(snapshot) {
            self.result = snapshot.val();
          });

        return self.result;
      },
    };
  };
}]);
