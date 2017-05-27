// resend verification code
$("#resend").click(function(){
  getAccessToken(function(error, accessToken) {
    callWhenConnected(function()
    {
      socket.emit('send-verification-code', {"Database": "Drivers", "Token": accessToken});
    });
  });
});

// submit verification code
$("#submit").click(function(){
  getAccessToken(function(error, accessToken) {
    var verificationCode = $("#code").val();

    callWhenConnected(function(){
      socket.emit('verify-number', {"Database": "Drivers", "VerificationCode": verificationCode, "Token": accessToken});
    });
  });
});
