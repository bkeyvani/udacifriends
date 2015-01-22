app.controller('RegistrationController', function($scope, $location){

  $scope.login = function() {
    $location.path('/friends');
  } // login

  $scope.register = function() {
    $location.path('/messages');
  } // register
}); //RegistrationController
