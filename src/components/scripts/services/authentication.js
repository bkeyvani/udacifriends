app.factory('AuthFactory',
function($firebaseAuth, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL);
  var authObj = $firebaseAuth(ref);

  var auth = {
    login: function(user){
      return authObj.$authWithPassword({
        email: user.email,
        password: user.password
      })
    } // login
  }; // auth

  return auth
});
