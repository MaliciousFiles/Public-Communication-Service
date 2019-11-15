function checkForEntry() {
	function validateEmail(email) 
	{
		var re = /\S+@\S+\.\S+/;
   		return re.test(email);
	}
	//Start checks for username field
	//look for username
	var userCheck = firebase.database().ref('/'+document.getElementById('username').value);
	userCheck.on("value", function(snapshot) {
		userCheck = snapshot.val();
	});
	//if statements
	var userField = false
	if (document.getElementById('username').value=="") {
		document.getElementById('usernameError').innerHTML = "The username field can't be blank!"
	} else if (userCheck!=null) {
		document.getElementById('usernameError').innerHTML = "That username is already registered!"
	} else {
		document.getElementById('usernameError').innerHTML = ""
		userField = true
	};
	//start checks for first name field
	//look for first name
	var firstNameCheck = firebase.database().ref('/'+document.getElementById('username').value+"first name");
	firstNameCheck.on("value", function(snapshot) {
		firstNameCheck = snapshot.val();
	});
	//if statements
	var firstNameField = false
	if (document.getElementById('firstName').value=="") {
		document.getElementById('firstNameError').innerHTML = "The first name field can't be blank!"
	} else if (firstNameCheck!=null) {
		document.getElementById('firstNameError').innerHTML = "That first name is already registered!"
	} else {
		document.getElementById('firstNameError').innerHTML = ""
		firstNameField = true
	};
	//start checks for last name field
	//look for last name
	var lastNameCheck = firebase.database().ref('/'+document.getElementById('username').value+"/last name");
	lastNameCheck.on("value", function(snapshot) {
		lastNameCheck = snapshot.val();
	});
	//if statements
	var lastNameField = false
	if (document.getElementById('lastName').value=="") {
		document.getElementById('lastNameError').innerHTML = "The last name field can't be blank!"
	} else if (lastNameCheck!=null) {
		document.getElementById('lastNameError').innerHTML = "That last name is already registered!"
	} else {
		document.getElementById('lastNameError').innerHTML = ""
		lastNameField = true
	};
	//start checks for email field
	//look for email name
	var emailCheck = firebase.database().ref('/'+document.getElementById('username').value+'/email');
	emailCheck.on("value", function(snapshot) {
		emailCheck = snapshot.val();
	});
	//if statements
	var emailField = false
	if (document.getElementById('email').value=="") {
		document.getElementById('emailError').innerHTML = "The email field can't be blank!"
	} else if ((validateEmail(document.getElementById('email').value)==false)) {
		document.getElementById('emailError').innerHTML = "Please enter a valid email!"
	} else if (emailCheck!=null) {
		document.getElementById('emailError').innerHTML = "That email is already registered!"
	} else {
		document.getElementById('emailError').innerHTML = ""
		emailField = true
	};
	//start checks for password field
	//if statements
	var passwordField = false
	if (document.getElementById('password').value=="") {
		document.getElementById('passwordError').innerHTML = "The password field can't be blank!"
	} else {
		document.getElementById('passwordError').innerHTML = ""
		passwordField = true
	};
	//start checks for password check field
	//if statements
	if (document.getElementById('passwordCheck').value=="") {
		document.getElementById('passwordCheckError').innerHTML = "The password check field can't be blank"
	} else if (document.getElementById('password').value!=document.getElementById('passwordCheck').value) {
		document.getElementById('passwordCheckError').innerHTML = "Passwords don't match!"
	} else {
		document.getElementById('passwordCheckError').innerHTML = ""
	};
	if (document.getElementById('password').value!=document.getElementById('passwordCheck').value) {
		document.getElementById('passwordCheckError').innerHTML = "Passwords don't match!"
	} else {
		document.getElementById('passwordCheckError').innerHTML = ""
	};
};
