function sendEmail () {
	firebase.database().ref('/usernames/""').set("")
	firebase.database().ref('/first names/""').set("")
	firebase.database().ref('/last names/""').set("")
	firebase.database().ref('/emails/""').set("")
	firebase.database().ref('/passwords/""').set("")
	firebase.database().ref('/profile images/""').set("")
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
	function validateEmail(email) 
	{
		var re = /\S+@\S+\.\S+/;
   		return re.test(email);
	}
  //check username field
  var usernameExistCheck = firebase.database().ref('/usernames');
  usernameExistCheck.on("value", function(snapshot) {
    usernameExistCheck = snapshot.val();
  });
  usernameExistCheck = checkEntry(usernameExistCheck, document.getElementById('username').value);
  //if statements
  if (document.getElementById('username').value=="") {
    document.getElementById('usernameError').innerHTML = "The username field can't be blank!"
  } else if (usernameExistCheck==false) {
    document.getElementById('usernameError').innerHTML = "Username incorrect!"
  } else {
    document.getElementById('usernameError').innerHTML = ""
    var usernameField = true;
  };
	window.username = document.getElementById('username').value;
  //check password field
  var emailExistCheck = firebase.database().ref('/emails');
  emailExistCheck.on("value", function(snapshot) {
    emailExistCheck = snapshot.val();
  });
  emailExistCheck = checkEntry(emailExistCheck, document.getElementById('email').value);
  //if statements
  if (document.getElementById('email').value=="") {
    document.getElementById('emailError').innerHTML = "The email field can't be blank!"
  } else if (validateEmail(document.getElementById('email').value)==false) {
	  document.getElementById('emailError').innerHTML = "Please enter a valid email!"
  } else if (emailExistCheck==false) {
    document.getElementById('emailError').innerHTML = "Email incorrect!"
  } else {
    document.getElementById('emailError').innerHTML = ""
    var emailField = true;
  };
  if (emailField==true && usernameField==true) {
	document.getElementById('username').setAttribute('type', 'password');
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
	document.getElementById('forgPassTitle').innerHTML = "Reset Password";
  }
}

function setPassword() {
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
