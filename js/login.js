// whenever a user is logged in, check their login status
FB.Event.subscribe('auth.login', function(response) {
  // alert("logged in with facebook!");
  loginStatusChange();
});
