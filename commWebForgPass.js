firebase.database().ref('/').on("value", function(snapshot) {
	Object.keys(snapshot.val()).forEach(function(item){
		var temp=snapshot.val()[item]
	})
});
firebase.database().ref('/usernames/""').set("")
firebase.database().ref('/first names/""').set("")
firebase.database().ref('/last names/""').set("")
firebase.database().ref('/emails/""').set("")
firebase.database().ref('/passwords/""').set("")
firebase.database().ref('/profile images/""').set("")
firebase.database().ref('/reset tokens/""').set("")
firebase.database().ref('/reset times/""').set("")
function resetPass() {
	firebase.database().ref('/usernames/""').set("")
	firebase.database().ref('/first names/""').set("")
	firebase.database().ref('/last names/""').set("")
	firebase.database().ref('/emails/""').set("")
	firebase.database().ref('/passwords/""').set("")
	firebase.database().ref('/profile images/""').set("")
	firebase.database().ref('/reset tokens/""').set("")
	function checkEntry(dict,entry) {
		for (index in Object.keys(dict)) {
			if (dict[Object.keys(dict)[index]]==entry) {
				var True=true
			}
		}
			if (True==true) {
				return true
			} else {
				return false
			}
		
	}
	function getKeyByValue(object, value) {
	    for( var prop in object ) {
		if( object.hasOwnProperty( prop ) ) {
		     if( object[ prop ] === value )
			 return prop;
		}
	    }
	}
	function validateEmail(email) 
	{
		var re = /\S+@\S+\.\S+/;
   		return re.test(email);
	}
	function makeToken() {
	   var result = '';
	   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	   var charactersLength = characters.length;
	   for ( var i = 0; i < 10; i++ ) {
	      result += characters.charAt(Math.floor(Math.random() * charactersLength));
	   }
	   return result;
	}
	function writeToDatabase(path,username,value) {
		firebase.database().ref(path+'/'+username).set(value);
	}
  //check username field
  var userExistCheck = firebase.database().ref('/usernames');
  userExistCheck.on("value", function(snapshot) {
    userExistCheck = snapshot.val();
  });
  userExistCheck = checkEntry(userExistCheck, document.getElementById('username').value);
  var emailExistCheck = firebase.database().ref('/emails');
  emailExistCheck.on("value", function(snapshot) {
	  emailExistCheck = snapshot.val();
  });
  emailExistCheck = checkEntry(emailExistCheck, document.getElementById('username').value);
  if (emailExistCheck || userExistCheck) {
    var usernameExistCheck = true;
  } else {
    var usernameExistCheck = false;
  }
  //if statements
  if (document.getElementById('username').value=="") {
    document.getElementById('usernameError').innerHTML = "The username/email field can't be blank!"
  } else if (usernameExistCheck==false) {
    	document.getElementById('usernameError').innerHTML = "Username/email incorrect!";
  } else {
    document.getElementById('usernameError').innerHTML = ""
    var usernameField = true;
  };
  if (usernameField==true) {
	
	var username = firebase.database().ref('/emails')
	username.on("value", function(snapshot) {
		username = snapshot.val();
	});
	username = getKeyByValue(username, document.getElementById('username').value);
	if (username==null) {
		username=document.getElementById('username').value
	};
	var email = firebase.database().ref("/emails")
	email.on('value', function(snapshot) {
		email = snapshot.val();
	})
	email = email[document.getElementById("username").value];
	if (email==null) {
		email = document.getElementById('username').value;
	}
	do {
		var token = makeToken()
		var tokenCheck = firebase.database().ref('/reset tokens')
		tokenCheck.on("value", function(snapshot) {
			tokenCheck = snapshot.val();
		});
	} while (checkEntry(tokenCheck, token));
	var time = {'day':new Date().getUTCDate(), 'second':new Date().getUTCHours()*3600+new Date().getUTCMinutes()*60+new Date().getUTCSeconds()}
	firebase.database().ref('/reset tokens/').on('value', function(snapshot) {
		value=snapshot.val()
		oldToken=value[document.getElementById('username')]
		if (oldToken!=null) {
			firebase.database().ref('/reset times/'+oldToken).remove()
			firebase.database().ref('/reset tokens/'+document.getElementById('username')).remove()
		}
	})
	writeToDatabase('/reset tokens', username, token)
	writeToDatabase('/reset times', token, time)
	emailjs.send("gmail", "forgot_password", {"to":email,"user":username,"token":token})
  	function move() {window.location.href = "./commWebLogin.html"}
  	document.getElementById('recoverButton').innerHTML = 'Sending...'
  	document.getElementById('recoverButton').disabled = true
  	document.getElementById('recoverButton').setAttribute('style', 'cursor: not-allowed')
  	setInterval(move, 6000)
  }
}
function checkTimes() {
	var tokenTimeCheck = firebase.database().ref('/reset times')
	tokenTimeCheck.on('value', function(snapshot) {tokenTimeCheck=snapshot.val()
		Object.keys(tokenTimeCheck).forEach(function(key) {
			if (key!='""') {
				var currentTime = {'day':new Date().getUTCDate(), 'second':new Date().getUTCHours()*3600+new Date().getUTCMinutes()*60+new Date().getUTCSeconds()}
				var setTime = tokenTimeCheck[key]
				if (currentTime['day'] > setTime['day']) {
					var passedSeconds = 86400-setTime['second'] + currentTime['second']
				} else {
					var passedSeconds = currentTime['second']-setTime['second']
				}
				alert(passedSeconds)
				if (passedSeconds >= 86400) {
					firebase.database().ref('/reset times/'+key).remove()
					firebase.database().ref('/reset tokens/'+document.getElementById('username')).remove()
				}
			}
		})
	})
}
setInterval(checkTimes, 1000)

