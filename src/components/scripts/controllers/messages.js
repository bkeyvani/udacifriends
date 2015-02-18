app.controller('MessagesCtrl',
  ['$scope', 'currentAuth', 'MessagesFctr', 'FriendsFctr',
  function($scope, currentAuth, MessagesFctr, FriendsFctr) {

    var currentUser = currentAuth.uid;
    var friends = FriendsFctr(currentUser);
    var messages = MessagesFctr(currentUser);

    $scope.messageCnt = messages.mArr.length;

    messages.mObj.$loaded().then(function(data) {
      // what happens after mObj is loaded
    })
    .catch(function(error) {
      console.error("Error:", error);
    });

    messages.mObj.$watch(function() {
      $scope.messages = messages.mObj;
    });

    messages.mArr.$watch(function() {
      $scope.messageCnt = messages.mArr.length;
    });

    $scope.friends = friends.fObj;
    $scope.sendMessageTo = function(message) {
      MessagesFctr(currentUser).addToConv(message);
      messages.mObj.$watch(function() {
        $scope.messages = messages.mObj;
      });
    };

    $scope.deletemessage=function(key) {
      messages.$remove(key);
    }; // deletemessage

    $scope.reply = function() {
      $scope.replyMessage = '';
    };

    $scope.loadMessagesFrom = function(userId, friendObj) {
      $scope.fromName = friendObj.fullName;
      $scope.activeFriendId = userId;
      $scope.fromMessages = function(userId) {
        var conversation;
        conversation = MessagesFctr(currentUser).getConvFrom(userId);
        return conversation.obj;
      }(userId);
    };

    $scope.newMessageTo = function(userId) {
      console.log(userId);
    };
  }
]); // MessagesCtrl
