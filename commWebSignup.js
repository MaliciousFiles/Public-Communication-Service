function checkForEntry() {
	//Start checks for username field
	//look for username
	var userCheck = firebase.database().ref('/'+document.getElementById('username').value);
	ref.on("value", function(snapshot) {
		console.log(snapshot.val());
	});
	//if statements
	var userField = False
	if (document.getElementById('username').value==null) {
		document.getElementById('usernameError').innerHTML = "The username field can't be blank!"
	} else if (userCheck!=null) {
		document.getElementById('usernameError').innerHTML = "That username already exists!"
	} else {
		userField = True
	};
	//start checks for first name field
	//look for first name
	var userCheck = firebase.database().ref('/'+document.getElementById('username').value+document.getElementById('firstName').value);
	ref.on("value", function(snapshot) {
		console.log(snapshot.val());
	});
	//if statements
	if (document.getElementById('firstName').value==null) {
		document.getElementById('usernameError').innerHTML = "The username field can't be blank!"
	} else if (userCheck!=null) {
		document.getElementById('usernameError').innerHTML = "That username already exists!"
	} else {
		userField = True
	};
	if (document.getElementById('password').value!=document.getElementById('passwordCheck').value) {
		document.getElementById('passwordCheckError').innerHTML = "Passwords don't match!"
	} else {
		document.getElementById('passwordCheckError').innerHTML = ""
	};
};
