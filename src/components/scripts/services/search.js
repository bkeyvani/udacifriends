// Search Factory

app.factory('SearchFctr', [function() {
  return function(user, query) {
    if (query !== '') {
      var firstName, lastName, fullName;

      firstName = user.firstname.toLowerCase();
      lastName = user.lastname.toLowerCase();
      fullName = firstName + ' ' + lastName;
      query = query.toLowerCase();

      return !!((firstName.indexOf(query || '') !== -1 ||
                 lastName.indexOf(query || '') !== -1 ||
                 fullName.indexOf(query || '') !== -1));
    }
  };
}]); //SearchFctr
