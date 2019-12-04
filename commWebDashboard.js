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
var user=getCookie('username')
