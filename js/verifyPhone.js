// resend verification code
$("#resend").click(function(){
  getAccessToken(function(error, accessToken) {
    callWhenConnected(function()
    {
      socket.emit('send-verification-code', {"Token": accessToken});
    });
  });
});

// submit verification code
$("#submit").click(function(){
  getAccessToken(function(error, accessToken) {
    var verificationCode = $("#code").val();

    callWhenConnected(function(){
      socket.emit('verify-number', {"VerificationCode": verificationCode, "Token": accessToken});
    });
  });
});
