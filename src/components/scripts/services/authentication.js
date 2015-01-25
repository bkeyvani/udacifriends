app.factory('Authentication',
function($firebase, $firebaseAuth, FIREBASE_URL, $location) {

  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  var authObj = {
    login: function(user){
      return auth.$authWithPassword({
        email: user.email,
        password: user.password
      });
    } // login
  }; // authObj

  return authObj
});
