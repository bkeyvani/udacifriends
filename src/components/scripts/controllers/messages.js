// Messages Controller

app.controller('MessagesCtrl', ['$scope', 'currentAuth', 'MessagesFctr', 'FriendsFctr', 'SearchFctr', 'UsersFctr', 'UserFctr',
  function($scope, currentAuth, MessagesFctr, FriendsFctr, SearchFctr, UsersFctr, UserFctr) {

    var currentUser = {};
    currentUser.id = currentAuth.uid;
    var user = UserFctr(currentUser.id);
    var friends = FriendsFctr(currentUser.id);
    var messages = MessagesFctr(currentUser.id);

    user.$loaded(function() {
      currentUser.firstname = user.firstname;
    });

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

    $scope.init = function() {
      $scope.ddCtrl = true;
      $scope.newMessage = {};
    }; // init

    $scope.friends = friends.fObj;
    $scope.sendMessageTo = function(message) {
      message.to = $scope.friendId;
      message.fromName = currentUser.firstname;
      console.log('message: ', message);
      MessagesFctr(currentUser.id).addToConv(message);

      // clear fields
      $scope.query = '';
      $scope.newMessage = {};

      // close new message window
      // TODO

    }; // sendMessageTo

    $scope.deletemessage=function(key) {
      // TODO
    }; // deletemessage

    $scope.reply = function(replyMessage) {

      if ($scope.activeFriendId) {
        replyMessage.fromName = currentUser.firstname;
        replyMessage.to = $scope.activeFriendId;
        MessagesFctr(currentUser.id).addToConv(replyMessage);
        $scope.replyMessage = {};
      };
    }; // reply

    $scope.loadMessagesFrom = function(userId, friendObj) {
      $scope.cnvCnt = 0; // reset conversations for each friend
      $scope.fromName = friendObj.fullName;
      $scope.activeFriendId = userId;

      $scope.fromMessages = function(userId) {
        var conversation;
        conversation = MessagesFctr(currentUser.id).getConvFrom(userId);
        conversation.arr.$watch(function() {
          $scope.cnvCnt = conversation.arr.length;
        });

        return conversation.obj;
      }(userId);
    }; // loadMessagesFrom

    $scope.addFriendById = function(user) {
      // TODO: refactor into search directive
      var fullName;

      fullName = user.firstname + ' ' + user.lastname;
      $scope.query = fullName;
      $scope.friendId = user.$id;
      $scope.ddCtrl = false; // hide dropdown
    }; // addFriendById

    $scope.users = UsersFctr.all();

    $scope.search = function(user) {
      if ($scope.query) {
        return SearchFctr(user, $scope.query);
      }
    }; // search

    $scope.showDropDown = function() {
      $scope.ddCtrl = true;
    }; // showDropDown

    $scope.hideDropDown = function() {
      $scope.ddCtrl = false;
    }; // hideDropDown
  }
]); // MessagesCtrl
