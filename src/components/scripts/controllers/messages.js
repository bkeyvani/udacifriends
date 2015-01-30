app.controller('MessagesController',
  function($scope, $rootScope, $firebase, FIREBASE_URL) {

    var fb = new Firebase(FIREBASE_URL + 'messages');
    var messages = $firebase(fb);
    var messagesObj = messages.$asObject();
    var messagesArray = messages.$asArray();

    messagesObj.$loaded().then(function(data) {
      $scope.messages = messagesObj;
    }); // messages Object Loaded

    messagesArray.$loaded().then(function(data) {
      $rootScope.messageCnt = messagesArray.length;
    }); // messages Array Loaded

    messagesArray.$watch(function(event) {
      $rootScope.messageCnt = messagesArray.length;
    });

    $scope.addmessage=function() {
      messages.$push({
        // TODO: add message info
        body: $scope.messageBody,
        from: currentUser.id, // get currentuser.uid
        read: false,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        to: $scope.messageTo// get destinationuser.uid
      });
    } // addmessage

    $scope.deletemessage=function(key) {
      messages.$remove(key);
    } // deletemessage

  }); // MessagesController

