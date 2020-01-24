firebase.database().ref('/usernames/""').set("")
firebase.database().ref('/first names/""').set("")
firebase.database().ref('/last names/""').set("")
firebase.database().ref('/emails/""').set("")
firebase.database().ref('/passwords/""').set("")
firebase.database().ref('/profile images/""').set("")
firebase.database().ref('/reset tokens/""').set("")
firebase.database().ref('/reset times/""').set("")
firebase.database().ref('/UIDs/""').set("")
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function getKeyByValue(object, value) {
	    for( var prop in object ) {
		if( object.hasOwnProperty( prop ) ) {
		     if( object[ prop ] === value )
			 return prop;
		}
	    }
	}
var user=getCookie('user')
if (user==undefined || user=="") {
	alert("Please log in!")
	document.location.href = "./commWebLogin"
}
firebase.database().ref('/UIDs').on('value', function(snapshot) {
  var username=getKeyByValue(snapshot.val(), getCookie('user'))
  document.getElementById('username').innerHTML = username
  firebase.database().ref('/profile images').on('value', function(snapshot) {
    document.getElementsByClassName('profileImage')[0].setAttribute('src', snapshot.val()[username])
  })
})

if (document.getElementById("notificationCont").innerHTML=="") {
    document.getElementById("notificationCont").innerHTML="<img src='./noNotifications.png' /><br><p style='color: black'>Nothing to see here!</p>"
}
