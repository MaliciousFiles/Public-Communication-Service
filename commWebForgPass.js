function sendEmail () {
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
	/*document.getElementById('username').setAttribute('type', 'password');
	document.getElementById('username').setAttribute('placeholder', '');
	document.getElementById('username').value = '';
  	document.getElementById('username').setAttribute('id', 'password');
	document.getElementById('email').setAttribute('type', 'password');
	document.getElementById('email').setAttribute('placeholder', '');
	document.getElementById('email').value = '';
	document.getElementById('email').setAttribute('id', 'passwordCheck');
	document.getElementById('usernameLabel').innerHTML = 'Password';
	document.getElementById('usernameLabel').setAttribute('id', 'passwordLabel');
	document.getElementById('emailLabel').innerHTML = 'Password Again';
	document.getElementById('emailLabel').setAttribute('id', 'passwordCheckLabel');
	document.getElementById('recoverButton').innerHTML = 'Set Password';
	document.getElementById('recoverButton').setAttribute('onclick', 'setPassword()');
	document.getElementById('recoverButton').setAttribute('id', 'setButton');
	document.getElementById('usernameError').setAttribute('id', 'passwordError');
	document.getElementById('emailError').setAttribute('id', 'passwordCheckError');
	document.getElementById('forgPassTitle').innerHTML = "Reset Password";*/
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
	writeToDatabase('/reset tokens', username, token)
	emailjs.send("gmail", "forgot_password", {"to":email,"user":username,"token":token})
  	window.location.href = "./commWebLogin.html"
  }
}

/*function setPassword() {
	function hash(string) { 
                var hash = 0; 
                if (string.length == 0) return hash; 
                for (i = 0; i < string.length; i++) { 
                    char = string.charCodeAt(i); 
                    hash = ((hash << 5) - hash) + char; 
                    hash = hash & hash; 
                } 
                return hash; 
            } 
	function writeToDatabase(path,username,value) {
		firebase.database().ref(path+'/'+username).set(value);
	}
	//password field
	var passwordField = false
	if (document.getElementById('password').value=="") {
		document.getElementById('passwordError').innerHTML = "The password field can't be blank!"
	} else {
		document.getElementById('passwordError').innerHTML = ""
		passwordField = true
	};
	//start checks for password check field
	var passwordCheckField = false
	//if statements
	if (document.getElementById('passwordCheck').value=="") {
		document.getElementById('passwordCheckError').innerHTML = "The password check field can't be blank"
	} else if (document.getElementById('password').value!=document.getElementById('passwordCheck').value) {
		document.getElementById('passwordCheckError').innerHTML = "Passwords don't match!"
	} else {
		document.getElementById('passwordCheckError').innerHTML = "";
	};
	if (document.getElementById('password').value!=document.getElementById('passwordCheck').value) {
		document.getElementById('passwordCheckError').innerHTML = "Passwords don't match!"
	} else {
		document.getElementById('passwordCheckError').innerHTML = "";
		passwordCheckField = true
	};
	if (passwordField==true && passwordCheckField==true) {
		var password=hash(document.getElementById('password').value);
		writeToDatabase('/passwords',window.username,password);
		window.location.href = "./commWebLogin.html"
	}
}*/
