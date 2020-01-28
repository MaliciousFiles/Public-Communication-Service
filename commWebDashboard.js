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
if (user=="" || user==undefined) {
	alert("Please log in!")
	document.location.href = "./commWebLogin"
}
firebase.database().ref('/UIDs').on('value', function(snapshot) {
  window.username=getKeyByValue(snapshot.val(), getCookie('user'))
  document.getElementById('username').innerHTML = window.username
  firebase.database().ref('/profile images').on('value', function(snapshot) {
    document.getElementsByClassName('profileImage')[0].setAttribute('src', snapshot.val()[window.username])
  })
})

if (document.getElementById('username').innerHTML != "RoalsonMalcolm") {
	alert("It was not equal")
}
firebase.database().ref('/notifications/'+document.getElementById('username').innerHTML+'/""').set("")
firebase.database().ref("/notifications/"+document.getElementById('username').innerHTML).on("value", function(snapshot) {
	window.notifications=snapshot.val()
	console.log(snapshot.val())
	alert(window.notifications)
})
delete window.notifications[""]
var notificationNum=-1
var senders=[]
var messages=[]
for (sender in window.notifications) {
    notificationNum++
    senders.push(sender)
    messages.push(notifications[sender])
}
for (let i=0;i<=notificationNum;i++) {
	node=document.getElementById("notificationCont")
	div=document.createElement("div")
	ital=document.createElement("i")
	ital.appendChild(document.createTextNode(senders[i]))
	div.appendChild(ital)
	br=document.createElement("br")
	div.appendChild(br)
	b=document.createElement("b")
	b.appendChild(document.createTextNode())
	div.appendChild(b)
	node.appendChild(div)
	div.onclick=function() {
	    location.href="./commWebUserPage?user="+senders[i]
	}
	
}

if (document.getElementById("notificationCont").innerHTML=="") {
    document.getElementById("notificationCont").innerHTML="<a style=\"color: black;cursor:default;\">No notifications, go play outside!</a>"
}
