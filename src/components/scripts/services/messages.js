// Messages Factory

app.factory('MessagesFctr', ['$firebase', 'FIREBASE_URL',
  function($firebase, FIREBASE_URL) {

  return function(userId) {
    var ref = new Firebase(FIREBASE_URL).child('messages');
    var messages = $firebase(ref);
    var messagesObj = messages.$asObject();
    var messagesArray = messages.$asArray();

    var getConvThread = function(userId1, userId2) {
      var ct, SEP;
      SEP = '^';
      ct = [userId1, userId2].sort().join(SEP);

      return ct;
    };

    return {
      sync: messages,
      mObj: messagesObj,
      mArr: messagesArray,
      getConvFrom: function(friendId) {
        var fromRef, fm, result;

        ct = getConvThread(userId, friendId);
        convRef = ref.child(ct);
        fc = $firebase(convRef); // firebase conversation thread ref.
        fcObj = fc.$asObject();
        fcArr = fc.$asArray();

        result = {
          obj: fcObj,
          arr: fcArr
        };

        return result;
      }, // from

      addToConv: function(message) {
        var friendId;

        friendId = message.to;
        ct = getConvThread(userId, friendId);
        convRef = ref.child(ct);
        fc = $firebase(convRef); // firebase conversation thread ref.

        fc.$push({
          from: message.fromName,
          body: message.body,
          read: false, // TODO: add read/unread capability
          timestamp: Firebase.ServerValue.TIMESTAMP,
        });
      } // to
    };
  };
}]);
