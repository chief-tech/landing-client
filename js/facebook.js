var loginPageLocation = "https://driver.letschief.com/login.html";
var infoPageLocation = "https://driver.letschief.com/portal.html";
var addInfoPageLocation = "https://driver.letschief.com/provideInfo.html";
var phoneVerificationPageLocation = "https://driver.letschief.com/verifyPhone.html";

socket.on('user-registered', function() {
  // alert("registered!");
  gotoInfo();
});

// if the user is not registered, make them go to login
socket.on('not-registered', function() {
  // alert("not registered");
  gotoLogin();
});

// if the user is not registered, make them go to login
socket.on('number-not-verified', function() {
  // alert('number not verified');
  gotoPhoneVerification();
});

// if the user is logged in but not fully registered, ask them to add info
socket.on('incomplete-registration', function() {
  // alert("incomplete regisdtrtion");
  gotoAddInfo();
});

function getAccessToken(callback) {
  FB.getLoginStatus(function(response) {
    if (response.status == "connected") {
      callback(null, response.authResponse.accessToken);
      return;
    } else {
      callback(new Error('unable to get access token', null));
      return;
    }
  });
}

function getUserName(callback) {
  getAccessToken(function(error, accessToken) {
    if(error) {
      callback(error, null, null);
      return;
    }

    FB.api('/me?access_token=' + accessToken + "&fields=first_name,last_name", function(response) {
      callback(null, response.first_name, response.last_name);
      return;
    });
  });
}

function loginStatusChange() {
  FB.getLoginStatus(function(response) {
    // if we are not on the login page and we are not connected, redirect to login page
    if (response.status == "connected")
    {
      var token = response.authResponse.accessToken;

      // send the token to the server for verification
      callWhenConnected(function() {
        socket.emit('verify-user', {"Database": "Drivers", "Token": token});
      });
    // if we are not logged into facebook
    } else {
      // if we are not currently at the login page, go there
      gotoLogin();
    }
  });
}

function gotoInfo() {
  if (window.location != infoPageLocation) {
    window.location = infoPageLocation;
  }
}

function gotoAddInfo() {
  if (window.location != addInfoPageLocation) {
    window.location = addInfoPageLocation;
  }
}

function gotoLogin() {
  if (window.location != loginPageLocation) {
    window.location = loginPageLocation;
  }
}

function gotoPhoneVerification() {
  if (window.location != phoneVerificationPageLocation) {
    window.location = phoneVerificationPageLocation;
  }
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '767877510042378',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.AppEvents.logPageView();

  loginStatusChange();
};

// (function(d, s, id){
//    var js, fjs = d.getElementsByTagName(s)[0];
//    if (d.getElementById(id)) {return;}
//    js = d.createElement(s); js.id = id;
//    js.src = "//connect.facebook.net/en_US/sdk.js";
//    fjs.parentNode.insertBefore(js, fjs);
//  }(document, 'script', 'facebook-jssdk'));
