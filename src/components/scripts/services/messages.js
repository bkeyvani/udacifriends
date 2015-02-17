// Messages Factory

app.factory('MessagesFctr', ['$firebase', 'FIREBASE_URL',
  function($firebase, FIREBASE_URL) {

  return function(userId) {
    var ref = new Firebase(FIREBASE_URL).child('messages');
    //var messages = $firebase(ref);
    var messages = $firebase(ref.orderByChild("to").startAt(userId).endAt(userId));
    var messagesObj = messages.$asObject();
    var messagesArray = messages.$asArray();

    return {
      sync: messages,
      mObj: messagesObj,
      mArr: messagesArray,
      from: function(uId) {
        var fromRef, fm, result;

        fromRef = ref.child(userId).child(uId);
        fm = $firebase(fromRef);
        fmObj = fm.$asObject();
        fmArr = fm.$asArray();

        //fmObj.$loaded().then(function(data) {
          //self.result = data;
        //});

        result = {
          obj: fmObj,
          arr: fmArr
        };
        return result;
      }, // from

      to: function(message) {
        var toRef, fromRef, fm;

        toRef = ref.child(message.to);
        fromRef = toRef.child(userId);
        fm = $firebase(fromRef);

        fm.$push({
          body: message.body,
          read: false,
          timestamp: Firebase.ServerValue.TIMESTAMP,
        });
      } // to
    };
  };
}]);
