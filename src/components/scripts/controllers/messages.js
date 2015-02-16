app.controller('MessagesCtrl',
  ['$scope', '$rootScope', '$firebase', 'FIREBASE_URL', 'currentAuth', 'User', 'FriendsFctr',
  function($scope, $rootScope, $firebase, FIREBASE_URL, currentAuth, User, FriendsFctr) {

    var currentUser = currentAuth.uid;
    var ref = new Firebase(FIREBASE_URL).child(currentUser).child('messages');
    var messages = $firebase(ref);
    var messagesObj = messages.$asObject();
    var messagesArray = messages.$asArray();
    var friends = FriendsFctr(currentUser);
    console.log(friends);

    messagesObj.$loaded().then(function(data) {
      $scope.messages = messagesObj;
    }); // messages Object Loaded

    messagesArray.$loaded().then(function(data) {
      $rootScope.messageCnt = messagesArray.length;
    }); // messages Array Loaded

    messagesArray.$watch(function(event) {
      $rootScope.messageCnt = messagesArray.length;
    });

    $scope.sendMessageTo=function(friendUserId) {
      messages.$push({
        // TODO: add message info
        body: $scope.messageBody,
        from: currentUser, // get currentUser.uid
        read: false,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        to: friendUserId
      });
    }; // addmessage

    $scope.deletemessage=function(key) {
      messages.$remove(key);
    }; // deletemessage

    $scope.reply = function() {
      console.log($scope.replyMessage);
      $scope.replyMessage = '';
    };
  }
]); // MessagesCtrl
