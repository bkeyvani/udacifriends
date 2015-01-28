app.factory('AuthFactory',
function($firebaseAuth, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);

  var auth = {
    authObj: $firebaseAuth(ref),
    login: function(user){
      return this.authObj.$authWithPassword({
        email: user.email,
        password: user.password
      });
    } // login
  }; // auth

  return auth
});