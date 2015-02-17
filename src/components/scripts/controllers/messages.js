app.controller('MessagesCtrl',
  ['$scope', '$rootScope', 'currentAuth', 'MessagesFctr', 'FriendsFctr',
  function($scope, $rootScope, currentAuth, MessagesFctr, FriendsFctr) {

    var currentUser = currentAuth.uid;
    var friends = FriendsFctr(currentUser);
    var messages = MessagesFctr(currentUser);

    //$rootScope.totalMessageCnt = messages.mArr.length;
    $scope.messageCnt = messages.mArr.length;

    messages.mArr.$watch(function() {
      $scope.messageCnt = messages.mArr.length;
    });

    $scope.friends = friends.fObj;
    $scope.sendMessageTo = function(userId, message) {
      console.log(messages.sync);
      console.log('to: ', userId);
      console.log('message', message);
      messages.sync.$push({
        // TODO: add message info
        body: message.body,
        from: currentUser, // get currentUser.uid
        read: false,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        to: message.to
      });
    }; // sendMessageTo

    $scope.deletemessage=function(key) {
      messages.$remove(key);
    }; // deletemessage

    $scope.reply = function() {
      console.log($scope.replyMessage);
      $scope.replyMessage = '';
    };

    $scope.loadMessagesFrom = function(userId, friendObj) {
      $scope.fromName = friendObj.fullName;
      $scope.activeFriendId = userId;
      $scope.fromMessages = MessagesFctr(currentUser).from(userId);

      console.log($scope.fromMessages);
    };

    $scope.newMessageTo = function(userId) {
      console.log(userId);
    };
  }
]); // MessagesCtrl
