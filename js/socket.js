// setup the socket.io connection
window.socket = io('driver.letschief.com:4433', { secure: true, port: 4433});

socket.on('invalid-phone-verification', function(){
  alert("You typed the wrong verification code.");
});

// any time a warning is issued, this logs what the warning says
socket.on('warning', function(data){
  alert("WARNING: " + data);
});

// this event fires when you try to add a user, but the number is already taken
// also fires when you try to change a photo but the specified phone number has not been registered
socket.on('number-unavailable', function(){
  alert('This number has already been taken.');
});

// this event fires if you try to add a user or change a phone number, and specify an invalid phone number
socket.on('invalid-number', function(){
  alert('This number has not been formatted correctly.');
});

// update the login status when we verify the phone number
socket.on('phone-verified', function(){
  loginStatusChange();
});

socket.on('user-added', function(){
  loginStatusChange();
});

function callWhenConnected(callback) {
  if (socket.connected) {
    callback();
    return;
  } else {
    socket.on('connected', function(){
      callback();
      return;
    });
  }
}
