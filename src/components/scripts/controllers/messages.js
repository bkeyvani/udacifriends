app.controller('MessagesCtrl',
  ['$scope', '$rootScope', 'currentAuth', 'MessagesFctr', 'FriendsFctr',
  function($scope, $rootScope, currentAuth, MessagesFctr, FriendsFctr) {

    var currentUser = currentAuth.uid;
    var friends = FriendsFctr(currentUser);
    var messages = MessagesFctr(currentUser);

    $rootScope.messageCnt = messages.mArr.length;

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
