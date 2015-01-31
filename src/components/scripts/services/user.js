app.factory('User', ['$FirebaseObject', '$firebase', 'FIREBASE_URL',
  function($FirebaseObject, $firebase, FIREBASE_URL) {
  // create a new factory based on $FirebaseObject
  var UserFactory = $FirebaseObject.$extendFactory({
    // these methods exist on the prototype, so we can access the data using `this`
    getFullName: function() {
      return this.firstname + ' ' + this.lastname;
    }
  });
  return function(userId) {
    var ref = new Firebase(FIREBASE_URL).child('users').child(userId);
    // override the factory used by $firebase
    var sync = $firebase(ref, { objectFactory: UserFactory });
    return sync.$asObject(); // this will be an instance of UserFactory
  }
}]);
