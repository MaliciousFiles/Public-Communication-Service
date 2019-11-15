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
		console.log(snapshot.val());
	});
	//if statements
	var userField = false
	if (document.getElementById('username').value==null) {
		document.getElementById('usernameError').innerHTML = "The username field can't be blank!"
	} else if (userCheck!=null) {
		document.getElementById('usernameError').innerHTML = "That username is already registered!"
	} else {
		document.getElementById('usernameError').innerHTML = ""
		userField = true
	};
	//start checks for first name field
	//look for first name
	var firstNameCheck = firebase.database().ref('/'+document.getElementById('username').value+document.getElementById('firstName').value);
	firstNameCheck.on("value", function(snapshot) {
		console.log(snapshot.val());
	});
	//if statements
	var firstNameField = false
	if (document.getElementById('firstName').value==null) {
		document.getElementById('firstNameError').innerHTML = "The first name field can't be blank!"
	} else if (firtNameCheck!=null) {
		document.getElementById('firstNameError').innerHTML = "That first name is already registered!"
	} else {
		document.getElementById('firstNameError').innerHTML = ""
		firstNameField = true
	};
	//start checks for last name field
	//look for last name
	var lastNameCheck = firebase.database().ref('/'+document.getElementById('username').value+document.getElementById('lastName').value);
	lastNameCheck.on("value", function(snapshot) {
		console.log(snapshot.val());
	});
	//if statements
	var lastNameField = false
	if (document.getElementById('lastName').value==null) {
		document.getElementById('lastNameError').innerHTML = "The last name field can't be blank!"
	} else if (lastNameCheck!=null) {
		document.getElementById('lastNameError').innerHTML = "That last name is already registered!"
	} else {
		document.getElementById('lastNameError').innerHTML = ""
		lastNameField = true
	};
	//start checks for email field
	//look for first name
	var emailCheck = firebase.database().ref('/'+document.getElementById('username').value+document.getElementById('email').value);
	emailCheck.on("value", function(snapshot) {
		console.log(snapshot.val());
	});
	//if statements
	var emailField = false
	if (document.getElementById('email').value==null) {
		document.getElementById('emailField').innerHTML = "The email field can't be blank!"
	} else if (validateEmail(document.getElementById('email'.value)==false)) {
		document.getElementById('emailError').innerHTML = "Please enter a valid email!"
	} else if (emailCheck!=null) {
		document.getElementById('emailField').innerHTML = "That email is already registered!"
	} else {
		document.getElementById('emailError').innerHTML = ""
		emailField = True
	};
	//start checks for password field
	//if statements
	var passwordField = false
	if (document.getElementById('password').value==null) {
		document.getElementById('passwordError').innerHTML = "The password field can't be blank!"
	} else {
		document.getElementById('passwordError').innerHTML = ""
		passwordField = true
	};
	//start checks for password check field
	//if statements
	if (document.getElementById('password').value!=document.getElementById('passwordCheck').value) {
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
