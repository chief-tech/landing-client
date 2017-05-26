
$(document).ready(function() {
  // set the username
  getUserName(function(error, firstName, lastName){
    // if we got the name successfully
    if (!error) {
      $("#name").text(firstName + " " + lastName);
    }
  });
});

// resend verification code
$("#submit").click(function(){
  getAccessToken(function(error, accessToken) {
    callWhenConnected(function()
    {
      var birthday = $("#birthday").val();
      console.log(birthday);
      object = {"FirstName": "Isaac", "LastName": "Zinda", "PhoneNumber": $("#phone").val(), "Birthday": birthday, "Token": accessToken};
      // alert(object);
      socket.emit('add-user', object);
    });
  });
});
