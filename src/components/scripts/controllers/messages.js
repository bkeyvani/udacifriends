app.controller('MessegesController',
  function($scope, $firebase) {

    var fb = new Firebase('https://udacifriendz.firebaseio.com/messages');
    var messages = $firebase(fb);

    $scope.messages = messages.$asObject();
  }
); // MessagesController
