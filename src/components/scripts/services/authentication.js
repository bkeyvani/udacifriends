app.factory('AuthFactory',
function($firebase, $firebaseAuth, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);

  var auth = {
    authObj: $firebaseAuth(ref),

    login: function(user){
      return this.authObj.$authWithPassword({
        email: user.email,
        password: user.password
      });
    }, // login

    register: function(user){
      return this.authObj.$createUser({
        email: user.email,
        password: user.password
      })
      .then(function(regUser) {
        var ref = new Firebase(FIREBASE_URL + 'users/');
        var firebaseUsers = $firebase(ref);

        var userInfo = {
          date: Firebase.ServerValue.TIMESTAMP,
          id: regUser.uid,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email
        };

        firebaseUsers.$set(regUser.uid, userInfo);
      }); // add user to firebase users
    }, // register

    logout: function() {
      return this.authObj.$unauth();
    }, // logout
  }; // auth

  return auth
});
