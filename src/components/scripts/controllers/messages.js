app.controller('MessagesCtrl',
  ['$scope', '$rootScope', 'currentAuth', 'MessagesFctr', 'FriendsFctr',
  function($scope, $rootScope, currentAuth, MessagesFctr, FriendsFctr) {

    var currentUser = currentAuth.uid;
    var friends = FriendsFctr(currentUser);
    var messages = MessagesFctr(currentUser);

    //$rootScope.totalMessageCnt = messages.mArr.length;
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
      MessagesFctr(currentUser).to(message);
      messages.mObj.$watch(function() {
        $scope.messages = messages.mObj;
      });
    };

    $scope.deletemessage=function(key) {
      messages.$remove(key);
    }; // deletemessage

    $scope.reply = function() {
      console.log($scope.replyMessage);
      $scope.replyMessage = '';
    };

    $scope.loadMessagesFrom = function(userId, friendObj) {
      //console.log('loadMessagesFrom');
      //console.log('currentUser: ', currentUser);
      //console.log('userId: ', userId);
      $scope.fromName = friendObj.fullName;
      $scope.activeFriendId = userId;
      $scope.fromMessages = function(userId) {
        var foo;
        //console.log('userId: ', userId);
        foo = MessagesFctr(currentUser).from(userId);
        //console.log('foo: ', foo);
        return foo;
      }(userId);
      console.log($scope.fromMessages);
      //messages.mArr.$watch(function() {
        //$scope.fromMessages = MessagesFctr(currentUser).from(userId);
      //});
    };

    $scope.newMessageTo = function(userId) {
      console.log(userId);
    };
  }
]); // MessagesCtrl
